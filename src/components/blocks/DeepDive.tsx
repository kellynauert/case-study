import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { bodyTextSx, captionTextSx, panelHeadingSx } from '../../lib/styles';
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
				sx={{
					display: 'block',
					mb: 1,
					...captionTextSx,
					fontWeight: 500,
					letterSpacing: '0.02em',
					textTransform: 'uppercase',
				}}>
				Deep dive
			</Typography>
			{title && (
				<Typography component='h4' sx={{ ...panelHeadingSx, mb: 1 }}>
					{title}
				</Typography>
			)}
			<Typography sx={{ ...bodyTextSx, mb: 0 }}>{body}</Typography>
		</Box>
	);
}
