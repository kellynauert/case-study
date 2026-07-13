import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { formatReadingTime, type CaseStudyMeta } from '../../lib/caseStudyTypes';
import { caseStudyTeasers } from '../../lib/site';
import { scrollMarginTop } from '../../lib/styles';
import { useViewedShowcases } from '../../hooks/useViewedShowcases';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isShowcaseViewed } from '../../lib/viewedShowcases';
import { FadeIn } from '../Layout/FadeIn';
import { tokens } from '../../theme/theme';

interface FeatureShowcaseListProps {
	studies: CaseStudyMeta[];
	nested?: boolean;
	/** 1-based start index for card numbering across grouped sections. */
	startIndex?: number;
}

const shinyBorderKeyframes = {
	'@keyframes showcase-border-shine': {
		'0%': { backgroundPosition: '0% 50%' },
		'50%': { backgroundPosition: '100% 50%' },
		'100%': { backgroundPosition: '0% 50%' },
	},
} as const;

const innerCardSx = {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	px: { xs: 2, sm: 2.25, md: 2 },
	pt: { xs: 2, sm: 2.25, md: 2 },
	pb: { xs: 1.25, sm: 1.5 },
	textDecoration: 'none',
	color: 'inherit',
	bgcolor: tokens.surface,
	borderRadius: 0.875,
	transition: 'background-color 180ms ease',
	'&:hover': {
		bgcolor: tokens.surfaceRaised,
		'& .feature-title': { color: tokens.accent },
	},
	'&:focus-visible': {
		outline: `2px solid ${tokens.accent}`,
		outlineOffset: 2,
	},
} as const;

const plainCardSx = {
	...innerCardSx,
	borderRadius: 1,
	scrollMarginTop,
	border: `1px solid ${tokens.border}`,
	transition: 'background-color 180ms ease, border-color 200ms ease',
	'&:hover': {
		bgcolor: tokens.surfaceRaised,
		borderColor: tokens.borderHover,
		'& .feature-title': { color: tokens.accent },
	},
} as const;

function getCardSx(nested: boolean) {
	return nested ?
			{
				...plainCardSx,
				bgcolor: tokens.background,
				'&:hover': {
					bgcolor: tokens.surfaceRaised,
					borderColor: tokens.borderHover,
					'& .feature-title': { color: tokens.accent },
				},
			}
		:	plainCardSx;
}

function getCardDescription(study: CaseStudyMeta): string {
	return caseStudyTeasers[study.slug as keyof typeof caseStudyTeasers] ?? study.subtitle;
}

export function FeatureShowcaseList({ studies, nested = false, startIndex = 1 }: FeatureShowcaseListProps) {
	const viewed = useViewedShowcases();
	const reducedMotion = useReducedMotion();
	const unreadCardSx = getCardSx(nested);
	const readInnerSx = {
		...innerCardSx,
		bgcolor: nested ? tokens.background : tokens.surface,
		'&:hover': {
			bgcolor: nested ? tokens.surfaceRaised : tokens.surfaceRaised,
			'& .feature-title': { color: tokens.accent },
		},
	};

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					xs: '1fr',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(2, 1fr)',
				},
				gap: { xs: 1.5, sm: 1.75, md: 1.5 },
			}}>
			{studies.map((study, index) => {
				const number = String(startIndex + index).padStart(2, '0');
				const viewedStudy = isShowcaseViewed(study.slug, viewed);
				const readingTime = formatReadingTime(study.readingMinutes);
				const description = getCardDescription(study);

				const cardContent = (
					<>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'baseline',
								gap: 1,
								mb: 0.75,
							}}>
							<Typography variant='displayTitle' sx={{ flexShrink: 0, color: tokens.accent }}>
								{number}
							</Typography>

							<Typography
								className='feature-title'
								variant='displayTitle'
								sx={{ flex: 1, minWidth: 0, transition: 'color 200ms ease' }}>
								{study.title}
							</Typography>
						</Box>

						<Typography variant='subtitle1' sx={{ m: 0, mb: 1.25, flex: 1 }}>
							{description}
						</Typography>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 1,
								mt: 'auto',
								pt: 1.25,
							}}>
							<Typography variant='caption' sx={{ m: 0 }}>
								{readingTime}
							</Typography>

							{viewedStudy ?
								<Box
									component='span'
									sx={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: 0.35,
										flexShrink: 0,
										fontSize: '0.75rem',
										fontWeight: 600,
										letterSpacing: '0.04em',
										textTransform: 'uppercase',
										color: tokens.accentPink,
									}}
									aria-hidden>
									<CheckRoundedIcon sx={{ fontSize: '0.875rem' }} />
									Read
								</Box>
							:	<Box
									component='span'
									sx={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: 0.35,
										flexShrink: 0,
										fontSize: '0.75rem',
										fontWeight: 600,
										letterSpacing: '0.04em',
										textTransform: 'uppercase',
										color: tokens.textMuted,
									}}
									aria-hidden>
									Unread
								</Box>
							}
						</Box>
					</>
				);

				return (
					<FadeIn key={study.slug} delay={(startIndex + index - 1) * 30}>
						{viewedStudy ?
							<Box
								sx={{
									...shinyBorderKeyframes,
									height: '100%',
									p: '1px',
									borderRadius: 1,
									scrollMarginTop,
									background: `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentPink}, ${tokens.accentLight}, ${tokens.accentPink}, ${tokens.accent})`,
									backgroundSize: '300% 300%',
									animation: reducedMotion ? 'none' : 'showcase-border-shine 4s ease infinite',
								}}>
								<Box
									component={Link}
									to={`/case-studies/${study.slug}`}
									id={`feature-${study.slug}`}
									aria-label={`${study.title}: ${description}. ${readingTime}. Read`}
									sx={readInnerSx}>
									{cardContent}
								</Box>
							</Box>
						:	<Box
								component={Link}
								to={`/case-studies/${study.slug}`}
								id={`feature-${study.slug}`}
								aria-label={`${study.title}: ${description}. ${readingTime}. Unread`}
								sx={unreadCardSx}>
								{cardContent}
							</Box>
						}
					</FadeIn>
				);
			})}
		</Box>
	);
}
