const STORAGE_KEY = 'mathtrack-viewed-showcases';

let cachedRaw: string | null = null;
let cachedSlugs: string[] = [];

function readSlugs(): string[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw === cachedRaw) return cachedSlugs;
		cachedRaw = raw;
		if (!raw) {
			cachedSlugs = [];
			return cachedSlugs;
		}
		const parsed = JSON.parse(raw);
		cachedSlugs = Array.isArray(parsed) ? parsed.filter((slug): slug is string => typeof slug === 'string') : [];
		return cachedSlugs;
	} catch {
		cachedRaw = null;
		cachedSlugs = [];
		return cachedSlugs;
	}
}

function writeSlugs(slugs: string[]) {
	try {
		const next = JSON.stringify(slugs);
		localStorage.setItem(STORAGE_KEY, next);
		cachedRaw = next;
		cachedSlugs = slugs;
	} catch {
		// Ignore quota / private-mode failures
	}
}

export function getViewedShowcases(): string[] {
	return readSlugs();
}

export function markShowcaseViewed(slug: string) {
	const current = readSlugs();
	if (current.includes(slug)) return;
	writeSlugs([...current, slug]);
}

export function isShowcaseViewed(slug: string, viewed: readonly string[] = readSlugs()): boolean {
	return viewed.includes(slug);
}
