import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { CaseStudyMeta } from '../../lib/caseStudies';
import { tokens } from '../../theme/theme';

interface CaseStudyIndexProps {
	studies: CaseStudyMeta[];
}

function ChapterRow({ study, index }: { study: CaseStudyMeta; index: number }) {
	const chapter = String(index + 1).padStart(2, '0');

	return (
		<Box
			component={Link}
			to={`/case-studies/${study.slug}`}
			sx={{
				display: 'grid',
				gridTemplateColumns: '2.5rem 1fr',
				gap: 2,
				py: 2,
				textDecoration: 'none',
				color: 'inherit',
				borderTop: `1px solid ${tokens.border}`,
				'&:focus-visible': {
					outline: `2px solid ${tokens.accent}`,
					outlineOffset: 2,
				},
			}}>
			<Typography
				sx={{
					fontFamily: tokens.fontDisplay,
					fontSize: '0.875rem',
					fontWeight: 600,
					color: alpha(tokens.accent, 0.45),
					lineHeight: 1.35,
					m: 0,
					pt: 0.125,
				}}>
				{chapter}
			</Typography>
			<Box>
				<Typography
					sx={{
						fontFamily: tokens.fontDisplay,
						fontSize: '1.0625rem',
						fontWeight: 600,
						color: tokens.textPrimary,
						lineHeight: 1.3,
						m: 0,
						mb: 0.5,
					}}>
					{study.title}
				</Typography>
				<Typography sx={{ fontSize: '0.875rem', lineHeight: 1.55, color: tokens.textMuted, m: 0 }}>{study.subtitle}</Typography>
			</Box>
		</Box>
	);
}

export function CaseStudyIndex({ studies }: CaseStudyIndexProps) {
	return (
		<Box
			sx={{
				position: 'relative',
				pl: { xs: 0, sm: 0.5 },
				'&::before': {
					content: '""',
					position: 'absolute',
					left: { xs: '1.15rem', sm: '1.4rem' },
					top: 12,
					bottom: 12,
					width: 1,
					bgcolor: alpha(tokens.accent, 0.15),
				},
			}}>
			{studies.map((study, index) => (
				<ChapterRow key={study.slug} study={study} index={index} />
			))}
		</Box>
	);
}
