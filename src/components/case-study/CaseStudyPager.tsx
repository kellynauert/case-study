import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getAdjacentCaseStudies } from '../../lib/caseStudyRegistry';
import type { CaseStudyMeta } from '../../lib/caseStudyTypes';
import { tokens } from '../../theme/theme';

interface CaseStudyPagerProps {
	slug: string;
}

const pagerLinkSx = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 0.5,
	minWidth: 0,
	minHeight: 44,
	p: 0,
	border: 'none',
	bgcolor: 'transparent',
	textDecoration: 'none',
	color: tokens.textMuted,
	transition: 'color 180ms ease',
	'&:hover': { color: tokens.accent },
	'&:focus-visible': {
		outline: `2px solid ${tokens.accent}`,
		outlineOffset: 3,
		borderRadius: 0.5,
	},
} as const;

const pagerLabelSx = {
	m: 0,
	minWidth: 0,
	color: 'inherit',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
} as const;

function PagerLink({ study, direction }: { study: CaseStudyMeta; direction: 'previous' | 'next' }) {
	const isPrevious = direction === 'previous';

	return (
		<Box
			component={Link}
			to={`/case-studies/${study.slug}`}
			aria-label={`${isPrevious ? 'Previous' : 'Next'} system: ${study.title}`}
			sx={{
				...pagerLinkSx,
				flexDirection: 'row',
				maxWidth: '100%',
			}}>
			{isPrevious && <ChevronLeftIcon sx={{ fontSize: '1rem', flexShrink: 0 }} />}
			<Typography variant='caption' sx={{ ...pagerLabelSx, display: { xs: 'block', md: 'none' } }}>
				{isPrevious ? 'Previous' : 'Next'}
			</Typography>
			<Typography variant='caption' sx={{ ...pagerLabelSx, display: { xs: 'none', md: 'block' } }}>
				{study.title}
			</Typography>
			{!isPrevious && <ChevronRightIcon sx={{ fontSize: '1rem', flexShrink: 0 }} />}
		</Box>
	);
}

export function CaseStudyPager({ slug }: CaseStudyPagerProps) {
	const { previous, next } = getAdjacentCaseStudies(slug);

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: { xs: 1, md: 2 },
				alignItems: 'center',
			}}>
			<Box sx={{ justifySelf: 'start', minWidth: 0 }}>{previous && <PagerLink study={previous} direction='previous' />}</Box>
			<Box sx={{ justifySelf: 'end', minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}>
				{next && <PagerLink study={next} direction='next' />}
			</Box>
		</Box>
	);
}
