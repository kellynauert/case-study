import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { tokens } from '../../theme/theme';

interface ScreenshotPlaceholderProps {
	label: string;
	compact?: boolean;
}

export function ScreenshotPlaceholder({ label, compact = false }: ScreenshotPlaceholderProps) {
	return (
		<Box
			sx={{
				my: compact ? 0 : 4,
				py: 5,
				px: 2,
				borderRadius: 2,
				border: `1px dashed ${tokens.border}`,
				bgcolor: tokens.surfaceRaised,
				boxShadow: tokens.shadowSubtle,
				textAlign: 'center',
			}}>
			<ImageOutlinedIcon sx={{ fontSize: 28, color: tokens.textMuted, mb: 1 }} aria-hidden />
			<Typography sx={{ display: 'block', fontSize: '0.8125rem', color: tokens.textMuted, m: 0 }}>{label}</Typography>
		</Box>
	);
}
