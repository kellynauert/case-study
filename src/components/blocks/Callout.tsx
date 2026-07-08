import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { bodyTextSx } from '../../lib/styles';
import { tokens } from '../../theme/theme';

interface CalloutProps {
	text: string;
}

export function Callout({ text }: CalloutProps) {
	return (
		<Box
			sx={{
				my: 3,
				px: 2,
				py: 1.75,
				borderRadius: 1.5,
				border: `1px solid ${alpha(tokens.accent, 0.15)}`,
				borderLeft: `3px solid ${tokens.accent}`,
				background: tokens.gradientSoft,
			}}>
			<Typography sx={{ ...bodyTextSx, color: tokens.textPrimary, fontWeight: 500, m: 0 }}>{text}</Typography>
		</Box>
	);
}
