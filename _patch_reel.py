from pathlib import Path

path = Path(r"c:\Users\Kelly Nauert\Documents\Code\Case Study\src\components\landing\LandingHero.tsx")
text = path.read_text(encoding="utf-8")
start = text.index("/** Slot-machine style field that scrolls options")
end = text.index("export function LandingHero()")

new = """/** Slot-machine style field that scrolls options, then becomes a normal dropdown. */
function HeroScrollingField({
	options,
	label,
	value,
	finalValue,
	onChange,
	spinDelay = 0,
}: {
	options: readonly string[];
	label: string;
	value: string;
	finalValue: string;
	onChange: (next: string) => void;
	spinDelay?: number;
}) {
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	const itemRef = useRef<HTMLSpanElement | null>(null);
	const stripRef = useRef<HTMLDivElement | null>(null);
	const lockedHeightRef = useRef(0);
	const [ready, setReady] = useState(false);
	const [itemHeight, setItemHeight] = useState(0);

	const finalIndex = Math.max(0, options.indexOf(finalValue));
	const settledValue = options[finalIndex] ?? finalValue;
	const reelItems = Array.from({ length: reelLoops + 1 }, () => options).flat();
	const longestOption = options.reduce((a, b) => (a.length >= b.length ? a : b), '');

	useEffect(() => {
		const el = itemRef.current;
		if (!el) return;
		const measure = () => {
			if (lockedHeightRef.current) return;
			const next = el.getBoundingClientRect().height;
			if (next > 0) {
				lockedHeightRef.current = next;
				setItemHeight(next);
			}
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, [options]);

	useEffect(() => {
		if (!itemHeight || ready) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) {
			onChangeRef.current(settledValue);
			setReady(true);
			return;
		}

		let cancelled = false;
		let delayTimer = 0;
		let animation: Animation | null = null;

		delayTimer = window.setTimeout(() => {
			const strip = stripRef.current;
			if (!strip || cancelled) return;

			// Scroll upward through the reel and land exactly on the final option.
			const distance = (reelLoops * options.length + finalIndex) * itemHeight;
			animation = strip.animate(
				[
					{ transform: 'translate3d(0, 0, 0)' },
					{ transform: `translate3d(0, -${distance}px, 0)` },
				],
				{
					duration: reelDurationMs,
					easing: 'cubic-bezier(0.08, 0.7, 0.1, 1)',
					fill: 'forwards',
				},
			);

			animation.finished
				.then(() => {
					if (cancelled) return;
					onChangeRef.current(settledValue);
					setReady(true);
				})
				.catch(() => {
					/* interrupted on unmount */
				});
		}, spinDelay);

		return () => {
			cancelled = true;
			window.clearTimeout(delayTimer);
			animation?.cancel();
		};
	}, [finalIndex, itemHeight, options.length, ready, settledValue, spinDelay]);

	if (ready) {
		return <HeroVerbDropdown value={value || settledValue} label={label} options={options} onChange={onChange} />;
	}

	return (
		<Box
			aria-hidden
			sx={{
				...fieldSurfaceSx,
				position: 'relative',
				height: itemHeight ? `${itemHeight}px` : '1.35em',
				minWidth: `calc(${longestOption.length}ch + 2.75rem)`,
				overflow: 'hidden',
				pointerEvents: 'none',
				pr: 3.5,
				opacity: itemHeight ? 1 : 0,
			}}>
			<Box
				ref={stripRef}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					willChange: 'transform',
				}}>
				{reelItems.map((option, index) => (
					<Box
						component='span'
						ref={index === 0 ? itemRef : undefined}
						key={`${option}-${index}`}
						sx={{
							height: itemHeight ? `${itemHeight}px` : '1.35em',
							display: 'flex',
							alignItems: 'center',
							whiteSpace: 'nowrap',
						}}>
						{option}
					</Box>
				))}
			</Box>
			<Box
				sx={{
					position: 'absolute',
					right: 8,
					top: '50%',
					transform: 'translateY(-50%)',
					display: 'flex',
					pointerEvents: 'none',
				}}>
				<RoundedChevronIcon open={false} />
			</Box>
		</Box>
	);
}

"""

path.write_text(text[:start] + new + text[end:], encoding="utf-8")
print("patched ok")
