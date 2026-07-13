import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { platformStory } from '../../lib/site';
import { tokens } from '../../theme/theme';

type TimelineItem = (typeof platformStory.timeline)[number];

const YEAR_START = platformStory.timelineRange.start;
const YEAR_END = platformStory.timelineRange.end;
const YEAR_SPAN = YEAR_END - YEAR_START + 1;
const YEARS = Array.from({ length: YEAR_SPAN }, (_, i) => YEAR_START + i);

/** Minimum label width so title + detail can wrap without clipping. */
const MIN_LABEL_PCT = 38;
const ROW_PX = { xs: 1.5, sm: 2 } as const;

function formatRange(item: TimelineItem): string {
	if (item.end === null) return `${item.start}–Present`;
	return `${item.start}–${item.end}`;
}

function yearLeftPct(year: number) {
	return ((year - YEAR_START) / YEAR_SPAN) * 100;
}

function barPlacement(item: TimelineItem) {
	const ongoing = item.end === null;
	const endExclusive = ongoing ? YEAR_END + 1 : item.end + 1;
	const startPct = yearLeftPct(item.start);
	const endPct = yearLeftPct(endExclusive);
	const durationPct = endPct - startPct;

	let labelLeft = startPct;
	let labelWidth = ongoing ? 100 - startPct : Math.max(durationPct, MIN_LABEL_PCT);

	if (!ongoing && labelLeft + labelWidth > 100) {
		labelLeft = Math.max(0, 100 - labelWidth);
	}

	return {
		ongoing,
		labelLeft: `${labelLeft}%`,
		labelWidth: `${labelWidth}%`,
	};
}

export function PlatformTimeline() {
	return (
		<Box aria-label='Platform evolution'>
			<Typography variant='body1' sx={{ m: 0, mb: 1.75 }}>
				{platformStory.timelineIntro}
			</Typography>

			<Box
				sx={{
					overflowX: { xs: 'auto', sm: 'visible' },
					WebkitOverflowScrolling: 'touch',
					mx: { xs: -0.5, sm: 0 },
					px: { xs: 0.5, sm: 0 },
					pb: { xs: 0.5, sm: 0 },
				}}>
				<Box
					sx={{
						minWidth: { xs: 640, sm: 0 },
						border: `1px solid ${tokens.border}`,
						borderRadius: 1.25,
						bgcolor: tokens.surface,
						overflow: 'hidden',
					}}>
					<YearAxis />
					<Box component='ol' sx={{ m: 0, p: 0, listStyle: 'none' }}>
						{platformStory.timeline.map((item, index) => (
							<TimelineRow
								key={item.title}
								item={item}
								color={item.end === null ? tokens.accentPink : tokens.accent}
								isLast={index === platformStory.timeline.length - 1}
							/>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

function YearAxis() {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: `repeat(${YEAR_SPAN}, minmax(0, 1fr))`,
				px: ROW_PX,
				py: 1.25,
				borderBottom: `1px solid ${tokens.border}`,
				bgcolor: tokens.surfaceRaised,
				position: 'relative',
			}}>
			{YEARS.map((year) =>
				year === YEAR_END ?
					<Box key={year} />
				:	<Typography
						key={year}
						component='span'
						sx={{
							m: 0,
							fontSize: { xs: '0.7rem', sm: '0.75rem' },
							fontWeight: 600,
							letterSpacing: '0.04em',
							color: tokens.textMuted,
						}}>
						{year}
					</Typography>
			)}
			<Typography
				component='span'
				sx={{
					position: 'absolute',
					right: ROW_PX,
					top: '50%',
					transform: 'translateY(-50%)',
					m: 0,
					fontSize: { xs: '0.7rem', sm: '0.75rem' },
					fontWeight: 600,
					letterSpacing: '0.04em',
					color: tokens.textMuted,
				}}>
				{YEAR_END}+
			</Typography>
		</Box>
	);
}

function TimelineRow({ item, color, isLast }: { item: TimelineItem; color: string; isLast: boolean }) {
	const { ongoing, labelLeft, labelWidth } = barPlacement(item);
	const range = formatRange(item);

	return (
		<Box
			component='li'
			sx={{
				position: 'relative',
				px: ROW_PX,
				py: 1.5,
				borderBottom: isLast ? 'none' : `1px solid ${tokens.border}`,
			}}>
			<GuideLines />

			<Box
				title={range}
				sx={{
					position: 'relative',
					ml: labelLeft,
					// Ongoing bars keep the same row padding as everyone else, then bleed
					// into the right gutter so they meet the chart edge.
					width: ongoing ? { xs: `calc(100% - ${labelLeft} + 12px)`, sm: `calc(100% - ${labelLeft} + 16px)` } : labelWidth,
					mr: ongoing ? { xs: -1.5, sm: -2 } : 0,
					bgcolor: color,
					px: { xs: 1.5, sm: 2 },
					py: 1.25,
					borderRadius: ongoing ? '10px 0 0 10px' : '10px',
					boxShadow: `inset 0 0 0 1px ${alpha('#000', 0.06)}`,
				}}>
				<BarCopy item={item} />
			</Box>
		</Box>
	);
}

function GuideLines() {
	return (
		<Box
			aria-hidden
			sx={{
				position: 'absolute',
				inset: 0,
				px: ROW_PX,
				pointerEvents: 'none',
			}}>
			<Box sx={{ position: 'relative', height: '100%' }}>
				{YEARS.map((year) =>
					year === YEAR_START || year === YEAR_END ?
						null
					:	<Box
							key={year}
							sx={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: `${yearLeftPct(year)}%`,
								borderLeft: `1px solid ${alpha(tokens.borderHover, 0.45)}`,
							}}
						/>
				)}
			</Box>
		</Box>
	);
}

function BarCopy({ item }: { item: TimelineItem }) {
	return (
		<>
			<Typography
				component='p'
				sx={{
					m: 0,
					fontSize: { xs: '0.8125rem', sm: '0.9375rem' },
					fontWeight: 700,
					lineHeight: 1.3,
					color: '#fff',
				}}>
				{item.title}
			</Typography>
			<Typography
				component='p'
				sx={{
					m: 0,
					mt: 0.4,
					fontSize: { xs: '0.75rem', sm: '0.8125rem' },
					fontWeight: 500,
					lineHeight: 1.45,
					color: alpha('#fff', 0.92),
				}}>
				{item.detail}
			</Typography>
		</>
	);
}
