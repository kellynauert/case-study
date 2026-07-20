#!/usr/bin/env node
/**
 * Portfolio review package exporter.
 *
 * Discovers every public route, captures Retina PNG screenshots + screen-layout PDFs,
 * and writes them to portfolio-review/{images,pdf}/.
 *
 * Usage: npm run portfolio-export
 */

import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'portfolio-review');
const PDF_DIR = path.join(OUT_DIR, 'pdf');
const IMAGE_DIR = path.join(OUT_DIR, 'images');

const VIEWPORT = { width: 1600, height: 1200 };
const DEVICE_SCALE_FACTOR = 2;
const LOCAL_HOST = '127.0.0.1';
const LOCAL_PORTS = [5173, 4173, 3000, 8080];
const ANIMATION_SETTLE_MS = 800;
const SCROLL_PAUSE_MS = 175;

const ASSET_EXTENSIONS = new Set([
	'.png',
	'.jpg',
	'.jpeg',
	'.gif',
	'.webp',
	'.svg',
	'.ico',
	'.pdf',
	'.zip',
	'.gz',
	'.tgz',
	'.mp4',
	'.webm',
	'.mp3',
	'.wav',
	'.css',
	'.js',
	'.map',
	'.json',
	'.xml',
	'.txt',
	'.woff',
	'.woff2',
	'.ttf',
	'.otf',
]);

function log(message) {
	console.log(message);
}

function warn(message) {
	console.warn(message);
}

async function pathExists(filePath) {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

function normalizeRoute(rawPath) {
	if (!rawPath) return null;
	let value = rawPath.trim();
	if (!value) return null;

	if (/^(mailto:|tel:|javascript:|data:)/i.test(value)) return null;
	if (value.startsWith('#')) return null;

	try {
		if (/^https?:\/\//i.test(value)) {
			const url = new URL(value);
			value = `${url.pathname}${url.search}`;
		}
	} catch {
		return null;
	}

	const hashIndex = value.indexOf('#');
	if (hashIndex >= 0) value = value.slice(0, hashIndex);

	const queryIndex = value.indexOf('?');
	if (queryIndex >= 0) value = value.slice(0, queryIndex);

	if (!value.startsWith('/')) return null;

	const ext = path.extname(value).toLowerCase();
	if (ext && ASSET_EXTENSIONS.has(ext)) return null;

	if (value.length > 1 && value.endsWith('/')) {
		value = value.slice(0, -1);
	}

	return value || '/';
}

function routeToFilename(route) {
	if (route === '/') return 'home';
	const segments = route.split('/').filter(Boolean);
	return segments[segments.length - 1] || 'home';
}

async function readProductionBaseUrl() {
	const cnamePath = path.join(ROOT, 'public', 'CNAME');
	if (await pathExists(cnamePath)) {
		const host = (await readFile(cnamePath, 'utf8')).trim().split(/\s+/)[0];
		if (host) return `https://${host}`;
	}
	return 'https://kellynauert.com';
}

function isPortOpen(port, host = LOCAL_HOST) {
	return new Promise((resolve) => {
		const socket = net.connect({ port, host }, () => {
			socket.end();
			resolve(true);
		});
		socket.on('error', () => resolve(false));
	});
}

function waitForHttpOk(url, { timeoutMs = 60_000, intervalMs = 400 } = {}) {
	const started = Date.now();
	return new Promise((resolve, reject) => {
		const attempt = () => {
			const client = url.startsWith('https') ? https : http;
			const req = client.get(url, (res) => {
				res.resume();
				if ((res.statusCode ?? 500) < 500) {
					resolve(true);
					return;
				}
				retry();
			});
			req.on('error', retry);
			req.setTimeout(3_000, () => {
				req.destroy();
				retry();
			});
		};

		const retry = () => {
			if (Date.now() - started >= timeoutMs) {
				reject(new Error(`Timed out waiting for ${url}`));
				return;
			}
			setTimeout(attempt, intervalMs);
		};

		attempt();
	});
}

async function findRunningLocalBaseUrl() {
	for (const port of LOCAL_PORTS) {
		if (!(await isPortOpen(port))) continue;
		const baseUrl = `http://${LOCAL_HOST}:${port}`;
		try {
			await waitForHttpOk(baseUrl, { timeoutMs: 2_000, intervalMs: 250 });
			return baseUrl;
		} catch {
			// Port open but not serving HTTP yet / not our app.
		}
	}
	return null;
}

async function killProcessTree(pid) {
	if (!pid) return;
	try {
		// Negative PID targets the process group when the child was spawned detached.
		process.kill(-pid, 'SIGTERM');
	} catch {
		try {
			process.kill(pid, 'SIGTERM');
		} catch {
			// Already exited.
		}
	}

	await delay(750);

	try {
		process.kill(-pid, 'SIGKILL');
	} catch {
		try {
			process.kill(pid, 'SIGKILL');
		} catch {
			// Already exited.
		}
	}
}

async function startLocalDevServer() {
	log('No local server detected — starting Vite dev server…');
	const child = spawn('npx', ['vite', '--host', LOCAL_HOST, '--port', '5173', '--strictPort'], {
		cwd: ROOT,
		stdio: ['ignore', 'pipe', 'pipe'],
		env: { ...process.env, BROWSER: 'none' },
		detached: true,
	});

	const logPath = path.join(await mkdtemp(path.join(os.tmpdir(), 'portfolio-export-')), 'vite.log');
	const logStream = createWriteStream(logPath);
	child.stdout.pipe(logStream);
	child.stderr.pipe(logStream);

	const baseUrl = `http://${LOCAL_HOST}:5173`;
	try {
		await waitForHttpOk(baseUrl, { timeoutMs: 90_000 });
		log(`Local development server ready at ${baseUrl}`);
		return {
			baseUrl,
			stop: async () => {
				await killProcessTree(child.pid);
			},
		};
	} catch (error) {
		await killProcessTree(child.pid);
		throw new Error(`Failed to start local Vite server. See ${logPath}. ${error.message}`);
	}
}

async function resolveBaseUrl() {
	const running = await findRunningLocalBaseUrl();
	if (running) {
		log(`Using local development server at ${running}`);
		return { baseUrl: running, stop: async () => {} };
	}

	try {
		return await startLocalDevServer();
	} catch (error) {
		warn(`Could not use local server (${error.message}). Falling back to production.`);
		const production = await readProductionBaseUrl();
		log(`Using production URL ${production}`);
		return { baseUrl: production, stop: async () => {} };
	}
}

function extractStaticRoutesFromApp(source) {
	const routes = [];
	for (const match of source.matchAll(/<Route\b[^>]*>/g)) {
		const tag = match[0];
		const pathMatch =
			tag.match(/\bpath\s*=\s*{?\s*(['"`])([^'"`]+)\1\s*}?/) ||
			tag.match(/\bpath\s*=\s*(['"`])([^'"`]+)\1/);
		if (pathMatch?.[2]) routes.push(pathMatch[2]);
	}

	return [...new Set(routes)];
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractCaseStudySlugs(source) {
	const slugs = [];
	for (const match of source.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)) {
		slugs.push(match[1]);
	}
	return [...new Set(slugs)];
}

async function discoverRoutesFromSource() {
	const appPath = path.join(ROOT, 'src', 'App.tsx');
	if (!(await pathExists(appPath))) return null;

	const appSource = await readFile(appPath, 'utf8');
	const templates = extractStaticRoutesFromApp(appSource);
	if (templates.length === 0) return null;

	const registryPath = path.join(ROOT, 'src', 'lib', 'caseStudyRegistry.ts');
	const slugs = (await pathExists(registryPath)) ? extractCaseStudySlugs(await readFile(registryPath, 'utf8')) : [];

	const routes = new Set();
	for (const template of templates) {
		if (template.includes(':')) {
			if (template.includes(':slug') && slugs.length > 0) {
				for (const slug of slugs) {
					routes.add(template.replace(':slug', slug));
				}
			} else {
				warn(`Skipping unresolved dynamic route template: ${template}`);
			}
		} else {
			const normalized = normalizeRoute(template);
			if (normalized) routes.add(normalized);
		}
	}

	if (routes.size === 0) return null;
	log(`Discovered ${routes.size} route(s) from React Router configuration.`);
	return [...routes].sort((a, b) => a.localeCompare(b));
}

function sameOriginPath(href, baseUrl) {
	try {
		const base = new URL(baseUrl);
		const url = new URL(href, base);
		if (url.origin !== base.origin) return null;
		return normalizeRoute(`${url.pathname}${url.search}`);
	} catch {
		return null;
	}
}

async function crawlRoutes(page, baseUrl, seedRoutes = ['/']) {
	const discovered = new Set();
	const queue = [];

	for (const seed of seedRoutes) {
		const normalized = normalizeRoute(seed) ?? '/';
		if (!discovered.has(normalized)) {
			discovered.add(normalized);
			queue.push(normalized);
		}
	}

	while (queue.length > 0) {
		const route = queue.shift();
		const target = new URL(route, baseUrl).href;
		try {
			await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 60_000 });
		} catch (error) {
			warn(`Crawl visit failed for ${route}: ${error.message}`);
			continue;
		}

		const hrefs = await page.$$eval('a[href]', (anchors) => anchors.map((a) => a.getAttribute('href') || ''));
		for (const href of hrefs) {
			const next = sameOriginPath(href, baseUrl);
			if (!next || discovered.has(next)) continue;
			discovered.add(next);
			queue.push(next);
		}
	}

	return [...discovered].sort((a, b) => a.localeCompare(b));
}

async function waitForFonts(page) {
	await page.evaluate(async () => {
		if (document.fonts?.ready) {
			await document.fonts.ready;
		}
	});
}

async function waitForImages(page) {
	await page.evaluate(async () => {
		const images = [...document.images];
		await Promise.all(
			images.map((img) => {
				if (img.complete && img.naturalWidth > 0) return Promise.resolve();
				return new Promise((resolve) => {
					const done = () => resolve();
					img.addEventListener('load', done, { once: true });
					img.addEventListener('error', done, { once: true });
					if (img.loading === 'lazy') {
						img.loading = 'eager';
					}
					// Re-trigger decode for lazy images that were never requested.
					const src = img.currentSrc || img.src;
					if (src) {
						img.src = src;
					}
				});
			}),
		);

		await Promise.all(
			images.map(async (img) => {
				if (typeof img.decode === 'function') {
					try {
						await img.decode();
					} catch {
						// Broken images should not fail the export.
					}
				}
			}),
		);
	});
}

async function scrollThroughPage(page) {
	await page.evaluate(async ({ pauseMs }) => {
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		const scroller = document.scrollingElement || document.documentElement;
		const viewport = window.innerHeight || 800;
		const step = Math.max(Math.floor(viewport * 0.7), 320);

		window.scrollTo(0, 0);
		await delay(pauseMs);

		let lastHeight = 0;
		for (let pass = 0; pass < 3; pass += 1) {
			const height = Math.max(scroller.scrollHeight, document.body?.scrollHeight ?? 0, viewport);
			if (height === lastHeight && pass > 0) break;
			lastHeight = height;

			for (let y = 0; y <= height; y += step) {
				window.scrollTo(0, y);
				await delay(pauseMs);
			}
			window.scrollTo(0, height);
			await delay(pauseMs);
		}

		window.scrollTo(0, 0);
		await delay(pauseMs);
	}, { pauseMs: SCROLL_PAUSE_MS });
}

async function waitForLazyContent(page) {
	// Force any remaining lazy media into view after the scroll pass.
	await page.evaluate(() => {
		for (const img of document.images) {
			if (img.loading === 'lazy') img.loading = 'eager';
		}
		for (const el of document.querySelectorAll('[loading="lazy"]')) {
			el.setAttribute('loading', 'eager');
		}
	});
	await waitForImages(page);
	await delay(ANIMATION_SETTLE_MS);
}

async function preparePageForCapture(page, url) {
	await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 });
	await waitForFonts(page);
	await waitForImages(page);
	await scrollThroughPage(page);
	await waitForFonts(page);
	await waitForLazyContent(page);
	await page.emulateMedia({ media: 'screen' });

	// Preserve on-screen layout in PDFs: print backgrounds and avoid print-only reflow.
	await page.addStyleTag({
		content: `
			html, body {
				height: auto !important;
				overflow: visible !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
			}
			*, *::before, *::after {
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
			}
			@page {
				margin: 0;
			}
		`,
	});
}

async function measurePageHeight(page) {
	return page.evaluate(() => {
		const doc = document.documentElement;
		const body = document.body;
		const roots = [doc, body, document.getElementById('root')].filter(Boolean);
		let max = window.innerHeight;
		for (const el of roots) {
			max = Math.max(max, el.scrollHeight, el.offsetHeight, el.clientHeight);
		}
		for (const el of document.body.querySelectorAll('*')) {
			const bottom = el.getBoundingClientRect().bottom + window.scrollY;
			if (Number.isFinite(bottom)) max = Math.max(max, Math.ceil(bottom));
		}
		return Math.ceil(max);
	});
}

async function capturePage(page, baseUrl, route) {
	const url = new URL(route, baseUrl).href;
	const filename = routeToFilename(route);
	const imagePath = path.join(IMAGE_DIR, `${filename}.png`);
	const pdfPath = path.join(PDF_DIR, `${filename}.pdf`);

	log(`→ ${route}  (${filename}.png / ${filename}.pdf)`);
	await preparePageForCapture(page, url);

	await page.screenshot({
		path: imagePath,
		fullPage: true,
		type: 'png',
		animations: 'disabled',
	});

	const pageHeight = await measurePageHeight(page);
	// Small buffer avoids Chromium clipping the last pixels into a second page.
	const pdfHeight = Math.max(pageHeight + 32, VIEWPORT.height);

	// Keep CSS screen layout (no print reflow) and include backgrounds/fonts.
	await page.pdf({
		path: pdfPath,
		width: `${VIEWPORT.width}px`,
		height: `${pdfHeight}px`,
		printBackground: true,
		displayHeaderFooter: false,
		margin: { top: '0', right: '0', bottom: '0', left: '0' },
		scale: 1,
		preferCSSPageSize: false,
	});

	return { route, filename, imagePath, pdfPath };
}

async function ensureOutputDirs() {
	await rm(OUT_DIR, { recursive: true, force: true });
	await mkdir(PDF_DIR, { recursive: true });
	await mkdir(IMAGE_DIR, { recursive: true });
}

async function ensureChromium() {
	try {
		const browser = await chromium.launch({ headless: true });
		await browser.close();
	} catch {
		log('Installing Playwright Chromium…');
		await new Promise((resolve, reject) => {
			const child = spawn('npx', ['playwright', 'install', 'chromium'], {
				cwd: ROOT,
				stdio: 'inherit',
			});
			child.on('exit', (code) => {
				if (code === 0) resolve();
				else reject(new Error(`playwright install chromium failed with code ${code}`));
			});
		});
	}
}

async function main() {
	const startedAt = Date.now();
	await ensureChromium();
	await ensureOutputDirs();

	const server = await resolveBaseUrl();
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: VIEWPORT,
		deviceScaleFactor: DEVICE_SCALE_FACTOR,
		colorScheme: 'light',
	});
	const page = await context.newPage();

	const summary = {
		baseUrl: server.baseUrl,
		captured: [],
		failed: [],
		skippedDuplicates: 0,
	};

	try {
		const fromSource = await discoverRoutesFromSource();
		let routes = fromSource ?? [];

		log('Crawling site for additional internal routes…');
		const crawled = await crawlRoutes(page, server.baseUrl, routes.length > 0 ? routes : ['/']);
		const merged = new Set(routes);
		let discoveredViaCrawl = 0;
		for (const route of crawled) {
			if (merged.has(route)) continue;
			merged.add(route);
			discoveredViaCrawl += 1;
		}
		if (discoveredViaCrawl > 0) {
			log(`Crawl found ${discoveredViaCrawl} additional route(s).`);
		}
		routes = [...merged].sort((a, b) => {
			if (a === '/') return -1;
			if (b === '/') return 1;
			return a.localeCompare(b);
		});

		// De-dupe by output filename (e.g. trailing-slash variants).
		const usedNames = new Set();
		const uniqueRoutes = [];
		for (const route of routes) {
			const name = routeToFilename(route);
			if (usedNames.has(name)) {
				summary.skippedDuplicates += 1;
				warn(`Skipping duplicate output name "${name}" for route ${route}`);
				continue;
			}
			usedNames.add(name);
			uniqueRoutes.push(route);
		}

		log(`Capturing ${uniqueRoutes.length} page(s)…`);
		for (const route of uniqueRoutes) {
			try {
				const result = await capturePage(page, server.baseUrl, route);
				summary.captured.push(result);
			} catch (error) {
				summary.failed.push({ route, error: error.message });
				warn(`✗ Failed ${route}: ${error.message}`);
			}
		}

		const manifest = {
			generatedAt: new Date().toISOString(),
			baseUrl: server.baseUrl,
			viewport: VIEWPORT,
			deviceScaleFactor: DEVICE_SCALE_FACTOR,
			pages: summary.captured.map(({ route, filename }) => ({
				route,
				pdf: `pdf/${filename}.pdf`,
				image: `images/${filename}.png`,
			})),
			failed: summary.failed,
		};
		await writeFile(path.join(OUT_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
	} finally {
		await context.close();
		await browser.close();
		await server.stop();
	}

	const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
	log('');
	log('═'.repeat(56));
	log('Portfolio review package complete');
	log(`  Source:     ${summary.baseUrl}`);
	log(`  Output:     ${path.relative(ROOT, OUT_DIR) || OUT_DIR}`);
	log(`  Captured:   ${summary.captured.length}`);
	log(`  Failed:     ${summary.failed.length}`);
	log(`  Duplicates: ${summary.skippedDuplicates}`);
	log(`  Elapsed:    ${elapsedSec}s`);
	if (summary.captured.length > 0) {
		log('  Files:');
		for (const item of summary.captured) {
			log(`    - ${item.filename}.pdf`);
			log(`    - ${item.filename}.png`);
		}
	}
	if (summary.failed.length > 0) {
		log('  Failures:');
		for (const item of summary.failed) {
			log(`    - ${item.route}: ${item.error}`);
		}
	}
	log('═'.repeat(56));

	if (summary.captured.length === 0) {
		process.exitCode = 1;
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
