import { useState, type ComponentType } from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { platformStory } from '../../lib/site';
import { scrollMarginTop } from '../../lib/styles';
import { tokens } from '../../theme/theme';

type TimelineItem = Omit<(typeof platformStory.timeline)[number], 'end'> & {
	/** `null` = still ongoing (“Present”). */
	end: number | null;
};

const YEAR_START = platformStory.timelineRange.start;
const YEAR_END = platformStory.timelineRange.end;
const YEAR_SPAN = YEAR_END - YEAR_START + 1;
const YEARS = Array.from({ length: YEAR_SPAN }, (_, i) => YEAR_START + i);

const LANE_H = 58;
const BAR_H = 42;
/** Visual lanes for the cascading flow (matches reference rhythm). */
const LANES = [0, 1, 2, 0, 1] as const;
const LANE_COUNT = Math.max(...LANES) + 1;

const ITEM_ICONS: ComponentType<SvgIconProps>[] = [BarChartRoundedIcon, PersonRoundedIcon, WorkRoundedIcon, SchoolRoundedIcon, GroupsRoundedIcon];

function formatRange(item: TimelineItem): string {
	if (item.end === null) return `${item.start}–Present`;
	return `${item.start}–${item.end}`;
}

function yearLeftPct(year: number) {
	return ((year - YEAR_START) / YEAR_SPAN) * 100;
}

function barPlacement(item: TimelineItem) {
	const left = yearLeftPct(item.start);
	if (item.end === null) {
		return { ongoing: true as const, left, width: 100 - left, end: 100 };
	}
	const width = Math.max(yearLeftPct(item.end + 1) - left, 5);
	return { ongoing: false as const, left, width, end: left + width };
}

function barColor(item: TimelineItem) {
	return item.end === null ? tokens.accentPink : tokens.accent;
}

function laneTop(lane: number) {
	return lane * LANE_H + (LANE_H - BAR_H) / 2;
}

function DetailPopover({ item, range }: { item: TimelineItem; range: string }) {
	return (
		<Box
			sx={{
				width: 260,
				borderRadius: 1,
				border: `1.5px solid ${alpha(tokens.accentPink, 0.22)}`,
				background: `linear-gradient(160deg, #FDF2F8 0%, #F5F3FF 45%, #F8F5FF 100%)`,
				overflow: 'hidden',
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 0.85,
					px: 1.25,
					py: 0.8,
					borderBottom: `1px dashed ${alpha(tokens.accent, 0.18)}`,
					bgcolor: tokens.surface,
				}}>
				<Box sx={{ display: 'flex', gap: 0.55 }} aria-hidden>
					{(
						[
							{ color: tokens.accentPink, label: 'close' },
							{ color: '#EAB308', label: 'minimize' },
							{ color: '#22C55E', label: 'maximize' },
						] as const
					).map((dot) => (
						<Box
							key={dot.label}
							sx={{
								width: 8,
								height: 8,
								borderRadius: '50%',
								bgcolor: dot.color,
								border: `1px solid ${alpha('#000', 0.06)}`,
							}}
						/>
					))}
				</Box>
				<Typography variant='devNotesTitle' sx={{ m: 0, flex: 1, minWidth: 0 }} noWrap>
					{item.title.toLowerCase()}
				</Typography>
			</Box>

			<Box sx={{ px: 1.15, py: 1.15, bgcolor: 'transparent' }}>
				<Box
					sx={{
						px: 1,
						py: 0.75,
						borderRadius: 1,
						bgcolor: tokens.surface,
						border: `1px solid ${alpha(tokens.accent, 0.22)}`,
					}}>
					<Typography variant='devNotesMeta' sx={{ m: 0, mb: 0.4, color: tokens.accent, fontWeight: 700 }}>
						{range}
					</Typography>
					<Typography variant='devNotesBody' sx={{ m: 0 }}>
						{item.detail}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export function PlatformTimeline() {
	const items = platformStory.timeline;
	const [activeTitle, setActiveTitle] = useState<string | null>(null);

	const placements = items.map(barPlacement);

	return (
		<Box id='platform-timeline' aria-label='Platform evolution' sx={{ scrollMarginTop }}>
			<Typography variant='body1' sx={{ m: 0, mb: 1.75 }}>
				{platformStory.timelineIntro}
			</Typography>

			<Box
				sx={{
					overflowX: { xs: 'auto', sm: 'visible' },
					WebkitOverflowScrolling: 'touch',
					mx: { xs: -0.5, sm: 0 },
					px: { xs: 0.5, sm: 0 },
					py: { xs: 5, md: 7 },
				}}>
				<Box sx={{ position: 'relative', minWidth: { xs: 820, sm: 0 } }}>
					<YearAxis />

					<Box
						sx={{
							position: 'relative',
							height: LANE_COUNT * LANE_H,
							mt: 0.5,
						}}>
						<GuideLines />

						{items.map((item, index) => (
							<FlowBar
								key={item.title}
								item={item}
								placement={placements[index]}
								lane={LANES[index] ?? 0}
								color={barColor(item)}
								Icon={ITEM_ICONS[index] ?? BarChartRoundedIcon}
								activeTitle={activeTitle}
								setActiveTitle={setActiveTitle}
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
		<Box sx={{ position: 'relative', pb: 1.25 }}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: `repeat(${YEAR_SPAN}, minmax(0, 1fr))`,
					mb: 1,
				}}>
				{YEARS.map((year) => (
					<Typography
						key={year}
						component='span'
						sx={{
							m: 0,
							fontSize: { xs: '0.6875rem', sm: '0.75rem' },
							fontWeight: 600,
							letterSpacing: '0.04em',
							color: tokens.textSecondary,
							lineHeight: 1.2,
						}}>
						{year}
					</Typography>
				))}
			</Box>

			<Box sx={{ position: 'relative', height: 10 }}>
				<Box
					aria-hidden
					sx={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: '50%',
						height: 2,
						mt: '-1px',
						borderRadius: 1,
						bgcolor: alpha(tokens.textSecondary, 0.14),
					}}
				/>
				{YEARS.map((year) => (
					<Box
						key={year}
						aria-hidden
						sx={{
							position: 'absolute',
							left: `${yearLeftPct(year)}%`,
							top: '50%',
							width: 8,
							height: 8,
							ml: '-4px',
							mt: '-4px',
							borderRadius: '50%',
							bgcolor: tokens.surface,
							border: `2px solid ${alpha(tokens.textSecondary, 0.35)}`,
							zIndex: 1,
						}}
					/>
				))}
			</Box>
		</Box>
	);
}

function GuideLines() {
	return (
		<Box aria-hidden sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
			{YEARS.map((year) => (
				<Box
					key={year}
					sx={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: `${yearLeftPct(year)}%`,
						borderLeft: `1px dashed ${alpha(tokens.accent, 0.16)}`,
					}}
				/>
			))}
		</Box>
	);
}

function FlowBar({
	item,
	placement,
	lane,
	color,
	Icon,
	activeTitle,
	setActiveTitle,
}: {
	item: TimelineItem;
	placement: ReturnType<typeof barPlacement>;
	lane: number;
	color: string;
	Icon: ComponentType<SvgIconProps>;
	activeTitle: string | null;
	setActiveTitle: (title: string | null) => void;
}) {
	const range = formatRange(item);
	const [hovered, setHovered] = useState(false);
	const [pinned, setPinned] = useState(false);
	const open = hovered || pinned;
	const isActive = activeTitle === item.title;
	const dimmed = activeTitle !== null && !isActive;

	return (
		<ClickAwayListener
			onClickAway={() => {
				setPinned(false);
				if (!hovered) setActiveTitle(null);
			}}>
			<Tooltip
				open={open}
				disableHoverListener
				disableFocusListener
				disableTouchListener
				title={<DetailPopover item={item} range={range} />}
				placement='top'
				slots={{ transition: Fade }}
				slotProps={{
					transition: { timeout: 160 },
					tooltip: {
						sx: {
							p: 0,
							bgcolor: 'transparent',
							boxShadow: 'none',
							maxWidth: 'none',
						},
					},
					popper: {
						// Keep the card in a portal with fixed positioning so opening it
						// never expands the timeline scroll container or shifts the bars.
						disablePortal: false,
						modifiers: [
							{ name: 'offset', options: { offset: [0, 10] } },
							{ name: 'preventOverflow', options: { altAxis: true, tether: false, padding: 8 } },
						],
						sx: {
							'& .MuiTooltip-tooltip': {
								p: 0,
								bgcolor: 'transparent',
								boxShadow: 'none',
							},
						},
					},
				}}>
				<Box
					component='button'
					type='button'
					aria-label={`${item.title}, ${range}. ${item.detail}`}
					aria-expanded={open}
					onMouseEnter={() => {
						setHovered(true);
						setActiveTitle(item.title);
					}}
					onMouseLeave={() => {
						setHovered(false);
						if (!pinned) setActiveTitle(null);
					}}
					onFocus={() => {
						setHovered(true);
						setActiveTitle(item.title);
					}}
					onBlur={() => {
						setHovered(false);
						if (!pinned) setActiveTitle(null);
					}}
					onClick={() => {
						setPinned((value) => {
							const next = !value;
							setActiveTitle(next ? item.title : null);
							return next;
						});
					}}
					sx={{
						position: 'absolute',
						top: laneTop(lane),
						left: `${placement.left}%`,
						width: `${placement.width}%`,
						height: BAR_H,
						zIndex: isActive ? 3 : 2,
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						pl: 0.85,
						pr: 1,
						m: 0,
						border: 'none',
						borderRadius: placement.ongoing ? '999px 0 0 999px' : '999px',
						bgcolor: color,
						opacity: dimmed ? 0.78 : 1,
						cursor: 'pointer',
						textAlign: 'left',
						font: 'inherit',
						appearance: 'none',
						overflow: 'hidden',
						transition: 'opacity 280ms ease',
						'&:focus-visible': {
							outline: `2px solid ${tokens.textPrimary}`,
							outlineOffset: 2,
						},
					}}>
					<Box
						aria-hidden
						sx={{
							width: 26,
							height: 26,
							flexShrink: 0,
							borderRadius: '50%',
							display: 'grid',
							placeItems: 'center',
							bgcolor: '#fff',
							color,
						}}>
						<Icon sx={{ fontSize: 15 }} />
					</Box>
					<Typography
						component='span'
						sx={{
							m: 0,
							minWidth: 0,
							fontFamily: tokens.fontBody,
							fontSize: { xs: '0.6875rem', sm: '0.75rem' },
							fontWeight: 700,
							lineHeight: 1.15,
							color: '#fff',
							whiteSpace: 'normal',
							overflowWrap: 'normal',
							wordBreak: 'normal',
							hyphens: 'none',
						}}>
						{item.title}
					</Typography>
				</Box>
			</Tooltip>
		</ClickAwayListener>
	);
}
