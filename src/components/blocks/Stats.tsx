import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { StatItem } from '../../lib/caseStudyTypes';
import { tokens } from '../../theme/theme';

interface StatsProps {
	items: StatItem[];
	compact?: boolean;
}

export function Stats({ items, compact = false }: StatsProps) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr 1fr', md: `repeat(${Math.min(items.length, 4)}, 1fr)` },
				gap: 1.5,
				my: compact ? 0 : 3,
			}}>
			{items.map((stat) => (
				<Box
					key={stat.label}
					sx={{
						p: 2,
						borderRadius: 1.5,
						border: `1px solid ${tokens.border}`,
						bgcolor: tokens.surfaceRaised,
					}}>
					<Typography
						sx={{
							fontSize: { xs: '1.5rem', sm: '1.875rem' },
							fontWeight: 600,
							letterSpacing: '-0.03em',
							lineHeight: 1,
							mb: 0.75,
							color: tokens.textPrimary,
						}}>
						{stat.value}
					</Typography>
					<Typography variant='caption' sx={{ m: 0 }}>{stat.label}</Typography>
				</Box>
			))}
		</Box>
	);
}
