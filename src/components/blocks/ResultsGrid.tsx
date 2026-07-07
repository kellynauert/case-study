import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from '../../theme/theme';

interface ResultsGridProps {
	items: string[];
}

export function ResultsGrid({ items }: ResultsGridProps) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
				gap: 1.5,
				my: 3,
			}}>
			{items.map((item) => (
				<Box
					key={item}
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						gap: 1.5,
						p: 2,
						borderRadius: 1.5,
						border: `1px solid ${tokens.border}`,
						bgcolor: tokens.surfaceRaised,
					}}>
					<Box
						aria-hidden
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: 24,
							height: 24,
							borderRadius: '50%',
							flexShrink: 0,
							bgcolor: tokens.textPrimary,
							color: tokens.background,
						}}>
						<CheckIcon sx={{ fontSize: 16 }} />
					</Box>
					<Typography variant='body2' sx={{ color: tokens.textPrimary, mb: 0, fontWeight: 500 }}>
						{item}
					</Typography>
				</Box>
			))}
		</Box>
	);
}
