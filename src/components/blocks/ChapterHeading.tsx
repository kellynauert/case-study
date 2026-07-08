import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { scrollMarginTop, sectionHeadingSx } from '../../lib/styles';

interface ChapterHeadingProps {
	id: string;
	title: string;
}

export function ChapterHeading({ id, title }: ChapterHeadingProps) {
	return (
		<Box id={id} sx={{ mb: { xs: 2, md: 2.5 }, scrollMarginTop }}>
			<Typography component='h2' sx={{ ...sectionHeadingSx, mb: 0 }}>
				{title}
			</Typography>
		</Box>
	);
}
