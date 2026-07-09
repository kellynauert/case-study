import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { scrollMarginTop, sectionHeadingSx } from '../../lib/styles';

interface StudySectionProps {
	id: string;
	title: string;
	children: ReactNode;
}

export function StudySection({ id, title, children }: StudySectionProps) {
	return (
		<Box id={id} sx={{ scrollMarginTop, py: { xs: 2, md: 3 } }}>
			<Typography component='h2' sx={{ ...sectionHeadingSx, mb: { xs: 2, md: 2.5 } }}>
				{title}
			</Typography>
			{children}
		</Box>
	);
}
