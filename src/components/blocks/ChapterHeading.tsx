import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../../theme/theme';

interface ChapterHeadingProps {
	id: string;
	title: string;
}

export function ChapterHeading({ id, title }: ChapterHeadingProps) {
	return (
		<Box id={id} sx={{ mb: 3, scrollMarginTop: '5rem' }}>
			<Typography variant='h2' component='h2' sx={{ mb: 1.25 }}>
				{title}
			</Typography>
			<Box
				aria-hidden
				sx={{
					width: 32,
					height: 3,
					borderRadius: 0.5,
					background: tokens.accent,
				}}
			/>
		</Box>
	);
}
