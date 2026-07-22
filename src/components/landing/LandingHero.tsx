import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import { FadeIn } from '../Layout/FadeIn';
import { hero } from '../../lib/site';
import { tokens } from '../../theme/theme';
import { alpha } from '@mui/material';

const capabilityIcons = {
	ux: AutoAwesomeRoundedIcon,
	ui: LayersRoundedIcon,
	frontend: DataObjectRoundedIcon,
	backend: StorageRoundedIcon,
	architecture: AccountTreeRoundedIcon,
} as const;

type HeroCompareLeft = (typeof hero.heroCompareLeftOptions)[number];
type HeroCompareRight = (typeof hero.heroCompareRightOptions)[number];

function pickRandomOption<T extends string>(options: readonly T[]): T {
	return options[Math.floor(Math.random() * options.length)]!;
}

/** Prefer a different option when the list allows; otherwise any random pick. */
function pickDifferentOption<T extends string>(options: readonly T[], current: T): T {
	const others = options.filter((option) => option !== current);
	if (others.length === 0) return pickRandomOption(options);
	return pickRandomOption(others);
}

/**
 * Shared h1 + spinner line-height. Shells lock height to this em value so wrapped
 * flex lines stay even; reel transforms use a measured px copy — see fieldHeightPx.
 */
const compareFieldLineHeight = 1.2;

/** Shared wall-clock spin — both fields use this so they stop together. */
const defaultReelDurationMs = 2800;
/**
 * Different loop counts ⇒ different travel distance in the same duration ⇒
 * independent visual speeds with an identical stop time (no start-delay hacks).
 */
const leftReelLoops = 3;
const rightReelLoops = 4;
/**
 * Slightly different ease-outs (no y>1 overshoot): distinct pacing, same stop time,
 * reel lands cleanly on the target word. Steeper than expo-out to cut the late crawl.
 */
const leftReelEasing = 'cubic-bezier(0.22, 0.9, 0.32, 1)';
const rightReelEasing = 'cubic-bezier(0.28, 0.88, 0.38, 1)';

/** Expand to longest-option width — springy horizontal overshoot (width only). */
const widthExpandTransition = 'width 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)';
/**
 * Fit to settled text — subtle *horizontal* overshoot on width only (bezier progress
 * past end width, then settle). No translateY / vertical bounce on text or reel.
 * Starts in the reel ease-out window.
 */
const widthFitTransition = 'width 0.48s cubic-bezier(0.34, 1.3, 0.64, 1)';
/**
 * Start fitting shell width toward the settled word this many ms before reel
 * `transitionend`. 0 = begin fit on settle (timeout at durationMs / transitionend fallback).
 */
const widthFitLeadMs = 0;
/**
 * Extra shell width past measured text — absorbs glyph ink / letter-spacing bleed and
 * keeps fit-overshoot from clipping into the neighbor through a too-tight box.
 */
const shellWidthPadPx = 2;
/** Gap between paired spinners — kept tight; shells allow horizontal glyph bleed during width anim. */
const compareSpinnerGap = '4px';

const autoSoloSpinMs = 15000;
const diceWiggleDurationMs = 560;
/** Full turns during a reel spin — decelerates with the same duration/easing as the reels. */
const diceSpinTurns = 5;
/**
 * Settled = purple. While spinning: pink while the strip is fast, then back to
 * purple as it decelerates — same wall-clock as the reel, no pale mid stop.
 */
function reelInkSx(spinning: boolean, durationMs: number) {
	const inkMid = `color-mix(in oklab, ${tokens.accentPink} 55%, ${tokens.accent} 45%)`;
	return {
		color: tokens.accent,
		'@keyframes reelInkDuringSpin': {
			'0%': { color: tokens.accent },
			'10%': { color: tokens.accentPink },
			'48%': { color: tokens.accentPink },
			'74%': { color: inkMid },
			'100%': { color: tokens.accent },
		},
		animation: spinning ? `reelInkDuringSpin ${durationMs}ms linear forwards` : 'none',
		'@media (prefers-reduced-motion: reduce)': {
			animation: 'none',
			color: tokens.accent,
		},
	} as const;
}

/**
 * Inline scrolling blank: plain text slot with reel animation (no wash / underline chrome).
 * Width: expand to longest-option size while spinning; fit-to-settled begins when the reel
 * finishes (widthFitLeadMs before transitionend; 0 = on settle). Horizontal overshoot on width only.
 * The reel decelerates and stops cleanly — no vertical bounce on the strip or settled label.
 *
 * Alignment: shell height is locked to h1 line-height (in-flow); strut owns width/baseline.
 * Reel + settled share one absolute viewport. Settled stays mounted in the same top / height box
 * as reel rows — ready is a visibility swap only, so overflow toggle cannot remount-shift Y.
 * Viewport clips top/bottom via clip-path so width overshoot can bleed horizontally (no hard X cut).
 * Row boxes use the shared line-height (px once measured) so glyphs aren’t clipped on Y.
 */
function HeroScrollingField({
	options,
	label,
	value,
	finalValue,
	onChange,
	onSpinningChange,
	spinDelay = 0,
	durationMs = defaultReelDurationMs,
	loops = leftReelLoops,
	easing = leftReelEasing,
	spinKey = 0,
}: {
	options: readonly string[];
	label: string;
	value: string;
	finalValue: string;
	onChange: (next: string) => void;
	onSpinningChange?: (spinning: boolean) => void;
	spinDelay?: number;
	/** Wall-clock reel duration — keep identical across paired fields for simultaneous stops. */
	durationMs?: number;
	/** Extra option-list repetitions — more loops = faster visual spin in the same duration. */
	loops?: number;
	/** CSS transition-timing-function for the reel transform. */
	easing?: string;
	/** Increment to re-run the reel from the start (e.g. randomize). */
	spinKey?: number;
}) {
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;
	const onSpinningChangeRef = useRef(onSpinningChange);
	onSpinningChangeRef.current = onSpinningChange;

	const shellRef = useRef<HTMLSpanElement | null>(null);
	const viewportRef = useRef<HTMLSpanElement | null>(null);
	const stripRef = useRef<HTMLDivElement | null>(null);
	const settledRef = useRef<HTMLSpanElement | null>(null);
	const measureRef = useRef<HTMLSpanElement | null>(null);
	const maxWidthRef = useRef(0);
	/** Locked for the duration of a spin so ResizeObserver mid-flight cannot desync row height vs translate. */
	const spinHeightRef = useRef(0);
	const [ready, setReady] = useState(false);
	/** Reel stays unpainted until start transform is locked on the strip. */
	const [reelArmed, setReelArmed] = useState(false);
	/** Measured viewport height in px — must equal each reel row height. */
	const [fieldHeightPx, setFieldHeightPx] = useState(0);

	const finalIndex = Math.max(0, options.indexOf(finalValue));
	const settledValue = options[finalIndex] ?? finalValue;
	const displayValue = value || settledValue;
	const reelItems = Array.from({ length: loops + 2 }, () => options).flat();
	/** Start on the current word so width/content don't jump when the reel replaces the settled label. */
	const fromIndex = Math.max(0, options.indexOf(value || settledValue));
	const targetIndex = loops * options.length + finalIndex;
	const showReel = !ready && reelArmed;
	const spinning = !ready;
	const rowHeightPx = spinHeightRef.current > 0 ? spinHeightRef.current : fieldHeightPx;
	const inkSx = reelInkSx(spinning, durationMs);

	const setShellWidthPx = (px: number, animate: false | 'expand' | 'fit' = false) => {
		const shell = shellRef.current;
		if (!shell || !(px > 0)) return;
		const next = `${Math.ceil(px) + shellWidthPadPx}px`;
		if (!animate) {
			shell.style.transition = 'none';
			shell.style.width = next;
			return;
		}
		// Pin the current computed width, then flip on the overshooting easing so both
		// fields always run the same from→to transition (avoids a no-op / cancelled tween).
		const current = shell.getBoundingClientRect().width;
		shell.style.transition = 'none';
		shell.style.width = `${Math.max(1, Math.ceil(current))}px`;
		void shell.offsetWidth;
		shell.style.transition = animate === 'expand' ? widthExpandTransition : widthFitTransition;
		shell.style.width = next;
	};

	/** Measure real glyph width — settled label is width:100%, so offsetWidth is useless. */
	const syncShellToSettled = (animate: false | 'fit' = false) => {
		const measure = measureRef.current;
		if (!measure) return;
		measure.textContent = displayValue || settledValue;
		const w = measure.offsetWidth;
		if (w > 0) setShellWidthPx(w, animate);
	};

	/** Measure every option once; cache the widest for the fixed spin-shell width. */
	const measureMaxWidth = () => {
		const el = measureRef.current;
		if (!el) return maxWidthRef.current;
		let max = 0;
		for (const option of options) {
			el.textContent = option;
			max = Math.max(max, el.offsetWidth);
		}
		maxWidthRef.current = max;
		return max;
	};

	useEffect(() => {
		measureMaxWidth();
	}, [options]); // eslint-disable-line react-hooks/exhaustive-deps -- remasure when option list identity changes

	/** Keep reel row height in sync with the title font (em-based viewport → px for transforms). */
	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const syncHeight = () => {
			const next = viewport.offsetHeight;
			if (!(next > 0)) return;
			// Ignore 1px subpixel flicker while shell width animates — that was shifting settled Y.
			setFieldHeightPx((prev) => (prev > 0 && Math.abs(prev - next) <= 1 ? prev : next));
		};
		syncHeight();
		const ro = new ResizeObserver(syncHeight);
		ro.observe(viewport);
		return () => ro.disconnect();
	}, []);

	useEffect(() => {
		spinHeightRef.current = 0;
		setReelArmed(false);
		setReady(false);
		onSpinningChangeRef.current?.(true);
		// Lock width to the still-visible settled label — never jump to the final target early.
		syncShellToSettled(false);
		// Intentionally only re-run on spinKey; settledValue is from the same batched render as the new targets.
	}, [spinKey]); // eslint-disable-line react-hooks/exhaustive-deps -- reset only on re-spin

	useEffect(() => {
		if (!ready) return;
		// Keep the locked spin height as the settled row height so remount/RO cannot nudge Y.
		if (spinHeightRef.current > 0) {
			setFieldHeightPx(spinHeightRef.current);
		}
		spinHeightRef.current = 0;
		onSpinningChangeRef.current?.(false);
		// Do not retouch shell width here — early fit (with overshoot) is already in flight.
	}, [ready, displayValue]); // eslint-disable-line react-hooks/exhaustive-deps -- settle mount; width handled by lead fit

	// Arm after delay once height is known: lock px height, expand shell, then show the reel.
	useEffect(() => {
		if (ready || reelArmed || fieldHeightPx <= 0) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) {
			onChangeRef.current(settledValue);
			setReady(true);
			return;
		}

		const delayTimer = window.setTimeout(() => {
			const strip = stripRef.current;
			const viewport = viewportRef.current;
			if (!strip || !viewport) return;
			// Re-read right before arming so row height and translate share one px value.
			const height = viewport.offsetHeight;
			if (!(height > 0)) return;
			spinHeightRef.current = height;
			setFieldHeightPx(height);
			strip.style.transition = 'none';
			strip.style.transform = `translate3d(0, -${fromIndex * height}px, 0)`;
			void strip.offsetHeight;
			const maxW = maxWidthRef.current || measureMaxWidth();
			setShellWidthPx(maxW, 'expand');
			setReelArmed(true);
		}, spinDelay);

		return () => window.clearTimeout(delayTimer);
	}, [ready, reelArmed, settledValue, spinDelay, spinKey, fromIndex, fieldHeightPx]);

	// Run the reel once armed; keep max width for the spin, then fit toward settled on land.
	// Height is locked in spinHeightRef — do not depend on fieldHeightPx or mid-spin ResizeObserver updates restart the tween.
	useEffect(() => {
		if (ready || !reelArmed) return;

		const strip = stripRef.current;
		const height = spinHeightRef.current;
		if (!strip || !(height > 0)) return;

		let alive = true;
		let frame = 0;
		let widthFitTimer = 0;
		let widthFitStarted = false;
		let removeTransitionEnd: (() => void) | null = null;
		const startY = fromIndex * height;
		const endY = targetIndex * height;

		const startWidthFit = (animate: false | 'fit') => {
			if (widthFitStarted && animate === 'fit') return;
			widthFitStarted = true;
			const measure = measureRef.current;
			if (!measure) return;
			measure.textContent = settledValue;
			setShellWidthPx(measure.offsetWidth, animate);
		};

		frame = window.requestAnimationFrame(() => {
			frame = window.requestAnimationFrame(() => {
				if (!alive) return;
				strip.style.transition = 'none';
				strip.style.transform = `translate3d(0, -${startY}px, 0)`;
				void strip.offsetHeight;

				strip.style.transition = `transform ${durationMs}ms ${easing}`;
				strip.style.transform = `translate3d(0, -${endY}px, 0)`;

				// Begin width → settled at reel end (lead 0) or earlier if widthFitLeadMs > 0.
				widthFitTimer = window.setTimeout(
					() => {
						if (!alive) return;
						startWidthFit('fit');
					},
					Math.max(0, durationMs - widthFitLeadMs)
				);

				const onEnd = (event: TransitionEvent) => {
					if (event.target !== strip || event.propertyName !== 'transform') return;
					removeTransitionEnd?.();
					if (!alive) return;
					// Lock on the landed row — no bounce/overshoot phase on the strip.
					strip.style.transition = 'none';
					strip.style.transform = `translate3d(0, -${endY}px, 0)`;
					// Fallback if lead timeout missed; otherwise leave in-flight fit alone.
					if (!widthFitStarted) startWidthFit('fit');
					// Batch with setReady so fromIndex updating via onChange cannot restart this effect.
					onChangeRef.current(settledValue);
					setReady(true);
				};
				strip.addEventListener('transitionend', onEnd);
				removeTransitionEnd = () => strip.removeEventListener('transitionend', onEnd);
			});
		});

		return () => {
			alive = false;
			window.cancelAnimationFrame(frame);
			window.clearTimeout(widthFitTimer);
			removeTransitionEnd?.();
		};
		// fromIndex / targetIndex / settledValue are locked when the reel arms for this spinKey —
		// do not re-run on onChange(settle) or the width-fit overshoot is cancelled mid-tween.
	}, [ready, reelArmed, durationMs, easing, spinKey]); // eslint-disable-line react-hooks/exhaustive-deps -- spin once per arm; settle must not restart

	const rowHeightCss = rowHeightPx > 0 ? `${rowHeightPx}px` : `${compareFieldLineHeight}em`;

	return (
		<Box
			component='span'
			ref={shellRef}
			aria-label={`${label}: ${displayValue}`}
			sx={{
				display: 'inline-block',
				position: 'relative',
				verticalAlign: 'baseline',
				flexShrink: 0,
				// Cap in-flow contribution to the title line box so wrapped flex lines stay even.
				boxSizing: 'border-box',
				height: `${compareFieldLineHeight}em`,
				maxHeight: `${compareFieldLineHeight}em`,
				// Transparent so a neighboring reel can bleed through during width overshoot.
				bgcolor: 'transparent',
				// Fallback ink if background-clip text isn’t applied on a child.
				color: tokens.accent,
				font: 'inherit',
				fontSize: 'inherit',
				fontWeight: 'inherit',
				fontFamily: 'inherit',
				letterSpacing: 'inherit',
				lineHeight: 'inherit',
				textAlign: 'center',
			}}>
			{/*
			  Invisible strut: owns width / baseline. Height is locked on the shell to h1 line-height
			  so spinners cannot inflate only the first wrapped flex line.
			*/}
			<Box
				component='span'
				aria-hidden
				sx={{
					visibility: 'hidden',
					display: 'block',
					height: '100%',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					pointerEvents: 'none',
					font: 'inherit',
					letterSpacing: 'inherit',
					lineHeight: 'inherit',
				}}>
				{displayValue || '\u00a0'}
			</Box>
			{/* Invisible sizer: same font metrics as the shell, used to cache longest-option width. */}
			<Box
				component='span'
				ref={measureRef}
				aria-hidden
				sx={{
					position: 'absolute',
					visibility: 'hidden',
					pointerEvents: 'none',
					whiteSpace: 'nowrap',
					height: 0,
					overflow: 'hidden',
					font: 'inherit',
					letterSpacing: 'inherit',
					lineHeight: 'inherit',
				}}
			/>
			{/*
			  Viewport — clip top/bottom only (reel strip) via clip-path so width animation can
			  bleed horizontally instead of hard-cutting glyphs. Avoid overflow-x/y mix: CSS
			  forces overflow-x to auto when overflow-y is hidden, which reintroduces the hard edge.
			*/}
			<Box
				component='span'
				ref={viewportRef}
				sx={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					overflow: 'visible',
					clipPath: 'inset(0 -1.5em)',
					bgcolor: 'transparent',
					lineHeight: 'inherit',
					font: 'inherit',
					letterSpacing: 'inherit',
					textAlign: 'center',
				}}>
				<Box
					component='span'
					ref={settledRef}
					key={`settled-ink-${spinKey}`}
					sx={{
						position: 'absolute',
						left: 0,
						top: 0,
						right: 0,
						display: 'block',
						boxSizing: 'border-box',
						height: rowHeightCss,
						minHeight: rowHeightCss,
						maxHeight: rowHeightCss,
						width: '100%',
						overflow: 'visible',
						whiteSpace: 'nowrap',
						font: 'inherit',
						letterSpacing: 'inherit',
						lineHeight: rowHeightCss,
						textAlign: 'center',
						visibility: showReel ? 'hidden' : 'visible',
						// Horizontal width overshoot lives on the shell; never bounce this label on Y.
						transform: 'none',
						...inkSx,
					}}>
					{displayValue}
				</Box>
				{!ready && (
					<Box
						ref={stripRef}
						key={`strip-ink-${spinKey}`}
						aria-hidden
						sx={{
							position: 'absolute',
							left: 0,
							top: 0,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'stretch',
							width: '100%',
							willChange: 'transform',
							visibility: showReel ? 'visible' : 'hidden',
							pointerEvents: 'none',
							...inkSx,
						}}>
						{reelItems.map((option, index) => (
							<Box
								component='span'
								key={`${option}-${index}`}
								sx={{
									display: 'block',
									boxSizing: 'border-box',
									height: rowHeightCss,
									minHeight: rowHeightCss,
									maxHeight: rowHeightCss,
									width: '100%',
									flexShrink: 0,
									overflow: 'visible',
									whiteSpace: 'nowrap',
									font: 'inherit',
									letterSpacing: 'inherit',
									lineHeight: rowHeightCss,
									textAlign: 'center',
									color: 'inherit',
								}}>
								{option}
							</Box>
						))}
					</Box>
				)}
			</Box>
		</Box>
	);
}

const initialCompareLeft: HeroCompareLeft = 'Design';
const initialCompareRight: HeroCompareRight = 'Engineer';

export function LandingHero() {
	const [spinKeyLeft, setSpinKeyLeft] = useState(0);
	const [spinKeyRight, setSpinKeyRight] = useState(0);
	/** First auto-spin always lands on Design Engineer; dice randomizes after that. */
	const [targetLeft, setTargetLeft] = useState<HeroCompareLeft>(initialCompareLeft);
	const [targetRight, setTargetRight] = useState<HeroCompareRight>(initialCompareRight);
	const [compareLeft, setCompareLeft] = useState<HeroCompareLeft>(initialCompareLeft);
	const [compareRight, setCompareRight] = useState<HeroCompareRight>(initialCompareRight);
	const [spinningLeft, setSpinningLeft] = useState(true);
	const [spinningRight, setSpinningRight] = useState(true);
	const [diceWiggle, setDiceWiggle] = useState(false);

	const compareLeftRef = useRef(compareLeft);
	const compareRightRef = useRef(compareRight);
	compareLeftRef.current = compareLeft;
	compareRightRef.current = compareRight;

	const anySpinning = spinningLeft || spinningRight;

	const randomizeCompare = () => {
		const nextLeft = pickRandomOption(hero.heroCompareLeftOptions);
		const nextRight = pickRandomOption(hero.heroCompareRightOptions);
		// Keep the previous settled labels until settle() — avoids a pre-spin flash of the new pair.
		setTargetLeft(nextLeft);
		setTargetRight(nextRight);
		setSpinningLeft(true);
		setSpinningRight(true);
		setSpinKeyLeft((key) => key + 1);
		setSpinKeyRight((key) => key + 1);
	};

	/** Every 8s after both fields are idle, spin exactly one side with a new random value. */
	useEffect(() => {
		if (anySpinning) return;

		const timer = window.setTimeout(() => {
			const spinLeft = Math.random() < 0.5;
			if (spinLeft) {
				const next = pickDifferentOption(hero.heroCompareLeftOptions, compareLeftRef.current);
				setTargetLeft(next);
				setSpinningLeft(true);
				setSpinKeyLeft((key) => key + 1);
			} else {
				const next = pickDifferentOption(hero.heroCompareRightOptions, compareRightRef.current);
				setTargetRight(next);
				setSpinningRight(true);
				setSpinKeyRight((key) => key + 1);
			}
		}, autoSoloSpinMs);

		return () => window.clearTimeout(timer);
	}, [anySpinning]);

	/** Occasional idle wiggle on the dice — only while both spinners are settled. */
	useEffect(() => {
		if (anySpinning) {
			setDiceWiggle(false);
			return;
		}

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) return;

		let cancelled = false;
		let timeout = 0;

		const schedule = () => {
			// Idle wiggle every ~4–8s while both spinners are settled.
			const delay = 4000 + Math.random() * 4000;
			timeout = window.setTimeout(() => {
				if (cancelled) return;
				setDiceWiggle(true);
				timeout = window.setTimeout(() => {
					if (cancelled) return;
					setDiceWiggle(false);
					schedule();
				}, diceWiggleDurationMs);
			}, delay);
		};

		schedule();
		return () => {
			cancelled = true;
			window.clearTimeout(timeout);
		};
	}, [anySpinning]);

	return (
		<Box
			id='landing-hero'
			component='header'
			sx={{
				px: { xs: 2, sm: 3 },
				pt: { xs: 3, md: 4 },
				pb: { xs: 3, md: 4 },
			}}>
			{/* Sentence title: Sole [spin] [spin] [dice] / of an Evolving SaaS Platform. */}
			<FadeIn>
				<Box
					component='h1'
					sx={{
						m: 0,
						mb: { xs: 1.25, md: 1.5 },
						fontFamily: tokens.fontDisplay,
						fontWeight: 600,
						letterSpacing: '-0.03em',
						lineHeight: compareFieldLineHeight,
						fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
						color: tokens.textPrimary,
						display: 'flex',
						flexWrap: 'wrap',
						// Baseline with strut shells: glyphs stay level when width animates.
						alignItems: 'baseline',
						columnGap: '4px',
						// No rowGap — wrapped flex lines must share the same line-height rhythm.
						rowGap: 0,
					}}>
					<Box component='span' sx={{ whiteSpace: 'nowrap', lineHeight: 'inherit' }}>
						{hero.heroComparePrefix}
					</Box>
					<Box
						component='span'
						sx={{
							display: 'inline-flex',
							alignItems: 'baseline',
							flexShrink: 0,
							width: 'max-content',
							maxWidth: '100%',
							lineHeight: 'inherit',
							height: `${compareFieldLineHeight}em`,
						}}>
						<Box
							component='span'
							sx={{
								display: 'inline-flex',
								alignItems: 'baseline',
								columnGap: compareSpinnerGap,
								flexShrink: 0,
								lineHeight: 'inherit',
								height: '100%',
							}}>
							<HeroScrollingField
								value={compareLeft}
								finalValue={targetLeft}
								label='Role discipline'
								options={hero.heroCompareLeftOptions}
								onChange={(next) => setCompareLeft(next as HeroCompareLeft)}
								onSpinningChange={setSpinningLeft}
								spinDelay={0}
								durationMs={defaultReelDurationMs}
								loops={leftReelLoops}
								easing={leftReelEasing}
								spinKey={spinKeyLeft}
							/>
							<HeroScrollingField
								value={compareRight}
								finalValue={targetRight}
								label='Role title'
								options={hero.heroCompareRightOptions}
								onChange={(next) => setCompareRight(next as HeroCompareRight)}
								onSpinningChange={setSpinningRight}
								spinDelay={0}
								durationMs={defaultReelDurationMs}
								loops={rightReelLoops}
								easing={rightReelEasing}
								spinKey={spinKeyRight}
							/>
						</Box>
						<Box
							component='button'
							type='button'
							aria-label='Randomize title'
							onClick={randomizeCompare}
							sx={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexShrink: 0,
								// Sit on the reel text baseline, tight to the right spinner.
								alignSelf: 'baseline',
								ml: '3px',
								p: 0,
								border: 'none',
								borderRadius: 1,
								bgcolor: 'transparent',
								boxShadow: 'none',
								color: tokens.accentPink,
								cursor: 'pointer',
								lineHeight: 1,
								outline: 'none',
								WebkitTapHighlightColor: 'transparent',
								transition: 'color 180ms ease, background-color 180ms ease, transform 180ms ease',
								'&:hover': {
									color: tokens.accentPink,
									boxShadow: 'none',
								},
								'&:active': {
									transform: 'rotate(-12deg) scale(0.94)',
									boxShadow: 'none',
								},
								'&:focus': {
									outline: 'none',
									boxShadow: 'none',
								},
								// Keyboard only — no ring flash from mouse focus / idle wiggle.
								'&:focus-visible': {
									outline: `2px solid ${tokens.accentPink}`,
									outlineOffset: 3,
								},
								'@media (prefers-reduced-motion: reduce)': {
									'&:active': { transform: 'none' },
								},
							}}>
							<Box
								key={anySpinning ? `spin-${spinKeyLeft}-${spinKeyRight}` : 'idle'}
								component='span'
								sx={{
									display: 'inline-flex',
									outline: 'none',
									boxShadow: 'none',
									// Optical baseline: SvgIcon bottom edge sits slightly below the glyph baseline.
									transform: 'translateY(0.08em)',
									'@keyframes diceIdleWiggle': {
										'0%, 100%': { transform: 'translateY(0.08em) rotate(0deg) translateX(0)' },
										'12%': { transform: 'translateY(0.08em) rotate(-20deg) translateX(-1.5px)' },
										'28%': { transform: 'translateY(0.08em) rotate(18deg) translateX(1.5px)' },
										'44%': { transform: 'translateY(0.08em) rotate(-16deg) translateX(-1px)' },
										'60%': { transform: 'translateY(0.08em) rotate(14deg) translateX(1px)' },
										'76%': { transform: 'translateY(0.08em) rotate(-8deg) translateX(-0.5px)' },
									},
									'@keyframes diceSpin': {
										'0%': { transform: 'translateY(0.08em) rotate(0deg)' },
										'100%': { transform: `translateY(0.08em) rotate(${diceSpinTurns * 360}deg)` },
									},
									// Match reel wall-clock + ease-out so the dice decelerates with the strips.
									animation: anySpinning
										? `diceSpin ${defaultReelDurationMs}ms ${leftReelEasing} forwards`
										: diceWiggle
											? `diceIdleWiggle ${diceWiggleDurationMs}ms ease-in-out`
											: 'none',
									'@media (prefers-reduced-motion: reduce)': {
										animation: 'none',
									},
								}}>
								<CasinoRoundedIcon sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, display: 'block' }} />
							</Box>
						</Box>
					</Box>
					{/* Full-basis row so the suffix always starts on the line after the spinner group. */}
					<Box
						component='span'
						sx={{
							flexBasis: '100%',
							width: '100%',
							lineHeight: 'inherit',
						}}>
						{hero.heroCompareSuffix}
					</Box>
				</Box>
			</FadeIn>

			<FadeIn delay={80}>
				<Typography
					component='p'
					sx={{
						m: 0,
						mb: { xs: 1.5, md: 1.75 },
						maxWidth: '38rem',
						fontFamily: tokens.fontBody,
						fontSize: { xs: '1.125rem', md: '1.25rem' },
						fontWeight: 500,
						lineHeight: 1.65,
						color: tokens.textPrimary,
					}}>
					{hero.supportingBefore}
					<Box component='span' style={{ color: tokens.accent }}>
						{hero.supportingAccent}
					</Box>
					{hero.supportingAfter}
				</Typography>
			</FadeIn>

			<FadeIn delay={160}>
				<Box
					component='section'
					aria-label='What the role covers'
					sx={{
						pt: { xs: 0.5, md: 0.75 },
					}}>
					<Box
						component='ul'
						sx={{
							m: 0,
							p: 0,
							listStyle: 'none',
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								sm: 'repeat(2, minmax(0, 1fr))',
							},
							columnGap: { sm: 3, md: 4 },
							rowGap: { xs: 2.25, sm: 2.5, md: 2.75 },
						}}>
						{hero.capabilities.map((capability, index) => {
							const Icon = capabilityIcons[capability.icon];
							return (
								<Box
									component='li'
									key={capability.label}
									sx={{
										display: 'grid',
										gridTemplateColumns: 'auto 1fr',
										columnGap: 1.5,
										alignItems: 'start',
										minWidth: 0,
										opacity: 0,
										animation: 'capabilityIn 480ms ease forwards',
										animationDelay: `${180 + index * 70}ms`,
										'@keyframes capabilityIn': {
											from: { opacity: 0, transform: 'translateY(6px)' },
											to: { opacity: 1, transform: 'translateY(0)' },
										},
										'@media (prefers-reduced-motion: reduce)': {
											opacity: 1,
											animation: 'none',
										},
									}}>
									<Box
										aria-hidden
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											width: { xs: 36, md: 40 },
											height: { xs: 36, md: 40 },
											// Match label half-leading so the chip top meets glyph tops, not the line-box top.
											mt: { xs: 'calc(0.9375rem * 0.15)', md: 'calc(1rem * 0.15)' },
											borderRadius: 1,
											color: tokens.accent,
											bgcolor: alpha(tokens.accent, 0.08),
											border: `1px solid ${alpha(tokens.accent, 0.16)}`,
										}}>
										<Icon sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' } }} />
									</Box>
									<Box sx={{ minWidth: 0 }}>
										<Typography
											component='p'
											sx={{
												m: 0,
												mb: 0.4,
												fontFamily: tokens.fontBody,
												fontSize: { xs: '0.9375rem', md: '1rem' },
												fontWeight: 700,
												letterSpacing: '-0.01em',
												lineHeight: 1.3,
												color: tokens.textPrimary,
											}}>
											{capability.label}
										</Typography>
										<Typography
											component='p'
											sx={{
												m: 0,
												fontFamily: tokens.fontBody,
												fontSize: { xs: '0.8125rem', md: '0.875rem' },
												fontWeight: 450,
												lineHeight: 1.5,
												color: tokens.textSecondary,
											}}>
											{capability.detail}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Box>
			</FadeIn>
		</Box>
	);
}
