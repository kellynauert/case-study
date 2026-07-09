import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useId, useState } from 'react';
import { platformStory, platformStats } from '../../lib/site';
import type { CaseStudyMeta } from '../../lib/caseStudies';
import { bodyTextSx, contentGridGap, panelHeadingSx, scrollMarginTop } from '../../lib/styles';
import { FeatureShowcaseList } from './FeatureShowcaseList';
import { Stats } from '../blocks/Stats';
import { tokens } from '../../theme/theme';

type StoryBlock = { type: 'paragraph'; text: string } | { type: 'list'; items: string[] };

function parseStoryBlocks(paragraphs: readonly string[]): StoryBlock[] {
	const blocks: StoryBlock[] = [];
	let listItems: string[] = [];

	for (const entry of paragraphs) {
		const text = entry.trim();
		if (!text) continue;

		if (text.startsWith('- ')) {
			listItems.push(text.slice(2));
			continue;
		}

		if (listItems.length > 0) {
			blocks.push({ type: 'list', items: listItems });
			listItems = [];
		}

		blocks.push({ type: 'paragraph', text });
	}

	if (listItems.length > 0) blocks.push({ type: 'list', items: listItems });

	return blocks;
}

const listSx = {
	m: 0,
	p: 0,
	listStyle: 'none',
	breakInside: 'avoid',
	'& li': {
		position: 'relative',
		pl: 2,
		mb: 1,
		fontSize: 'inherit',
		lineHeight: 1.6,
		color: 'inherit',
		'&:last-child': { mb: 0 },
		'&::before': {
			content: '""',
			position: 'absolute',
			left: 0,
			top: '0.72em',
			width: 6,
			height: 6,
			borderRadius: '50%',
			bgcolor: tokens.accent,
		},
	},
} as const;

const toggleButtonSx = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 0.5,
	m: 0,
	p: 0,
	minHeight: 44,
	border: 'none',
	bgcolor: 'transparent',
	fontFamily: 'inherit',
	fontSize: 'inherit',
	fontWeight: 600,
	color: tokens.accent,
	cursor: 'pointer',
	textAlign: 'left',
	transition: 'color 200ms ease',
	'&:hover': { color: tokens.accentPink },
	'&:focus-visible': {
		outline: `2px solid ${tokens.accent}`,
		outlineOffset: 2,
		borderRadius: '2px',
	},
} as const;

function CollapsibleStoryList({
	items,
	expandLabel = 'Show features',
	collapseLabel = 'Hide features',
}: {
	items: string[];
	expandLabel?: string;
	collapseLabel?: string;
}) {
	const [expanded, setExpanded] = useState(false);
	const listId = useId();

	return (
		<Box>
			<Box
				component='button'
				type='button'
				aria-expanded={expanded}
				aria-controls={listId}
				onClick={() => setExpanded((open) => !open)}
				sx={toggleButtonSx}>
				{expanded ? collapseLabel : expandLabel}
			</Box>

			{expanded && (
				<Box id={listId} component='ul' sx={{ ...listSx, mt: 1.5 }}>
					{items.map((item) => (
						<Box key={item} component='li'>
							{item}
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
}

function StoryBlocks({
	blocks,
	storyTextSx,
	collapsibleListMinItems,
}: {
	blocks: StoryBlock[];
	storyTextSx: { m: number; fontSize: { xs: string; md: string }; lineHeight: number; color: string };
	collapsibleListMinItems?: number;
}) {
	return (
		<Box
			sx={{
				fontSize: storyTextSx.fontSize,
				lineHeight: storyTextSx.lineHeight,
				color: storyTextSx.color,
				'& > *': {
					breakInside: 'avoid',
					mb: { xs: 2, md: 2.25 },
					'&:last-child': { mb: 0 },
				},
			}}>
			{blocks.map((block, index) =>
				block.type === 'paragraph' ?
					<Typography key={`p-${index}`} sx={storyTextSx}>
						{block.text}
					</Typography>
				: collapsibleListMinItems !== undefined && block.items.length >= collapsibleListMinItems ?
					<CollapsibleStoryList key={`ul-${index}`} items={block.items} />
				:	<Box key={`ul-${index}`} component='ul' sx={listSx}>
						{block.items.map((item) => (
							<Box key={item} component='li'>
								{item}
							</Box>
						))}
					</Box>
			)}
		</Box>
	);
}

const contextStoryTextSx = {
	m: 0,
	...bodyTextSx,
} as const;

export function ContextPanel({ studies }: { studies: CaseStudyMeta[] }) {
	const storyBlocks = parseStoryBlocks(platformStory.paragraphs);

	return (
		<Box
			component='section'
			id='case-studies'
			aria-labelledby='platform-story-heading'
			sx={{
				position: 'relative',
				mb: { xs: 2.5, md: 3 },
				bgcolor: tokens.surface,
				border: `1px solid ${tokens.border}`,
				borderRadius: 1.5,
				pl: { xs: 2.5, md: 3.25 },
				pr: { xs: 2.25, md: 3 },
				py: { xs: 2.5, md: 3 },
				scrollMarginTop,
			}}>
			<Typography
				id='platform-story-heading'
				component='h3'
				sx={{
					...panelHeadingSx,
					mb: { xs: 2, md: 2.25 },
				}}>
				{platformStory.heading}
			</Typography>

			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
					gap: contentGridGap,
					alignItems: 'start',
				}}>
				{storyBlocks.map((block, index) =>
					block.type === 'paragraph' ?
						<Typography key={`p-${index}`} sx={contextStoryTextSx}>
							{block.text}
						</Typography>
					:	<StoryBlocks key={`blocks-${index}`} blocks={[block]} storyTextSx={contextStoryTextSx} />
				)}
			</Box>

			<Box sx={{ mt: { xs: 2.5, md: 3 } }}>
				<Stats items={[...platformStats]} compact />
			</Box>

			<Box sx={{ mt: { xs: 3, md: 3.5 } }}>
				<FeatureShowcaseList studies={studies} nested />
			</Box>
		</Box>
	);
}
