import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MetricItem } from '../../lib/parseMarkdown';
import { tokens } from '../../theme/theme';

interface MetricsProps {
	items: MetricItem[];
}

export function Metrics({ items }: MetricsProps) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr 1fr', md: `repeat(${Math.min(items.length, 4)}, 1fr)` },
				gap: 1.5,
				my: 3,
			}}>
			{items.map((metric) => (
				<Box
					key={`${metric.value}-${metric.label}`}
					sx={{
						p: 2,
						borderRadius: 1.5,
						border: `1px solid ${tokens.border}`,
						bgcolor: tokens.surfaceRaised,
					}}>
					<Typography
						sx={{
							fontSize: '1.75rem',
							fontWeight: 600,
							letterSpacing: '-0.03em',
							lineHeight: 1,
							mb: 0.5,
							color: tokens.textPrimary,
						}}>
						{metric.value}
					</Typography>
					<Typography
						sx={{
							fontSize: '0.8125rem',
							fontWeight: 600,
							color: tokens.textPrimary,
							mb: 0.5,
							letterSpacing: '-0.01em',
						}}>
						{metric.label}
					</Typography>
					<Typography sx={{ fontSize: '0.8125rem', color: tokens.textMuted, lineHeight: 1.5, m: 0 }}>{metric.description}</Typography>
				</Box>
			))}
		</Box>
	);
}
