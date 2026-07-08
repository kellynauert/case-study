import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../../theme/theme';

interface QuoteBlockProps {
	text: string;
}

export function QuoteBlock({ text }: QuoteBlockProps) {
	return (
		<Box
			component='blockquote'
			sx={{
				my: 3,
				mx: 0,
				p: 2,
				pl: 2.5,
				border: 'none',
				borderRadius: 1.5,
				bgcolor: tokens.surfaceRaised,
				borderLeft: `3px solid ${tokens.textPrimary}`,
			}}>
			<Typography
				sx={{
					fontSize: { xs: '0.875rem', md: '0.9375rem' },
					fontStyle: 'italic',
					fontWeight: 400,
					color: tokens.textPrimary,
					lineHeight: 1.6,
					m: 0,
				}}>
				&ldquo;{text}&rdquo;
			</Typography>
		</Box>
	);
}
