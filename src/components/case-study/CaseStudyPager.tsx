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
	currentTitle: string;
}

const pagerLinkSx = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 0.5,
	minWidth: 0,
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

function PagerLink({ study, direction }: { study: CaseStudyMeta; direction: 'previous' | 'next' }) {
	const isPrevious = direction === 'previous';

	return (
		<Box
			component={Link}
			to={`/case-studies/${study.slug}`}
			aria-label={`${isPrevious ? 'Previous' : 'Next'} system: ${study.title}`}
			sx={{
				...pagerLinkSx,
				flexDirection: isPrevious ? 'row' : 'row-reverse',
				maxWidth: '100%',
			}}>
			{isPrevious ?
				<ChevronLeftIcon sx={{ fontSize: '0.875rem', flexShrink: 0 }} />
			:	<ChevronRightIcon sx={{ fontSize: '0.875rem', flexShrink: 0 }} />}
			<Typography
				variant='caption'
				sx={{
					m: 0,
					minWidth: 0,
					color: 'inherit',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}>
				{study.title}
			</Typography>
		</Box>
	);
}

export function CaseStudyPager({ slug, currentTitle }: CaseStudyPagerProps) {
	const { previous, next } = getAdjacentCaseStudies(slug);

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
				gap: { xs: 1.5, sm: 2 },
				alignItems: 'center',
			}}>
			<Box sx={{ justifySelf: { xs: 'stretch', sm: 'start' }, minWidth: 0 }}>
				{previous && <PagerLink study={previous} direction='previous' />}
			</Box>
			<Typography variant='caption' sx={{ m: 0, textAlign: 'center', color: tokens.textSecondary }}>
				{currentTitle}
			</Typography>
			<Box
				sx={{
					justifySelf: { xs: 'stretch', sm: 'end' },
					minWidth: 0,
					display: 'flex',
					justifyContent: { xs: 'flex-start', sm: 'flex-end' },
				}}>
				{next && <PagerLink study={next} direction='next' />}
			</Box>
		</Box>
	);
}
