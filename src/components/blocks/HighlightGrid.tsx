import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { bodyTextSx } from '../../lib/styles';
import { tokens } from '../../theme/theme';

interface HighlightGridProps {
	items: string[];
}

export function HighlightGrid({ items }: HighlightGridProps) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
				gap: 1.5,
				my: 3,
			}}>
			{items.map((item, i) => (
				<Box
					key={item}
					sx={{
						position: 'relative',
						px: 2,
						py: 1.75,
						borderRadius: 1.5,
						border: `1px solid ${tokens.border}`,
						bgcolor: tokens.surfaceRaised,
						'&::before': {
							content: `"${String(i + 1).padStart(2, '0')}"`,
							position: 'absolute',
							top: 10,
							right: 12,
							fontSize: '0.75rem',
							fontWeight: 600,
							color: tokens.textMuted,
						},
					}}>
					<Typography sx={{ ...bodyTextSx, color: tokens.textPrimary, mb: 0, pr: 4, fontWeight: 500 }}>{item}</Typography>
				</Box>
			))}
		</Box>
	);
}
