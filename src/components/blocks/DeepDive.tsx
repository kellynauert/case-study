import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../../theme/theme';

interface DeepDiveProps {
	title: string;
	body: string;
}

export function DeepDive({ title, body }: DeepDiveProps) {
	return (
		<Box
			sx={{
				my: 3,
				p: 2,
				borderRadius: 1.5,
				border: `1px solid ${tokens.border}`,
				bgcolor: tokens.surfaceRaised,
			}}>
			<Typography
				variant='caption'
				sx={{
					display: 'block',
					mb: 1,
					color: tokens.textMuted,
				}}>
				Deep dive
			</Typography>
			{title && (
				<Typography variant='h3' component='h4' sx={{ fontSize: '1rem', mb: 1 }}>
					{title}
				</Typography>
			)}
			<Typography variant='body2' sx={{ mb: 0, color: tokens.textSecondary }}>
				{body}
			</Typography>
		</Box>
	);
}
