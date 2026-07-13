import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { StatItem } from '../../lib/caseStudyTypes';
import { tokens } from '../../theme/theme';

interface StatsProps {
	items: StatItem[];
	compact?: boolean;
}

export function Stats({ items, compact = false }: StatsProps) {
	const count = items.length;

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					xs: count > 3 ? 'repeat(2, 1fr)' : `repeat(${Math.min(count, 3)}, 1fr)`,
					sm: `repeat(${count}, 1fr)`,
				},
				gap: { xs: 1, sm: 1.5 },
				my: compact ? 0 : 3,
			}}>
			{items.map((stat) => (
				<Box
					key={stat.label}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 0.25,
						px: { xs: 1, sm: 2 },
						py: { xs: 1.25, sm: 1.75 },
						borderRadius: 1,
						border: `1px solid ${tokens.border}`,
						bgcolor: tokens.surface,
					}}>
					<Typography
						component='p'
						sx={{
							m: 0,
							fontFamily: tokens.fontDisplay,
							fontSize: { xs: '1.5rem', sm: '1.75rem' },
							fontWeight: 600,
							letterSpacing: '-0.03em',
							lineHeight: 1.1,
							...tokens.gradientText,
						}}>
						{stat.value}
					</Typography>
					<Typography
						component='p'
						sx={{
							m: 0,
							fontSize: '0.8125rem',
							fontWeight: 500,
							lineHeight: 1.2,
							color: tokens.textSecondary,
							letterSpacing: '0.01em',
						}}>
						{stat.label}
					</Typography>
				</Box>
			))}
		</Box>
	);
}
