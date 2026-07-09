import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { scrollMarginTop } from '../../lib/styles';

interface StudySectionProps {
	id: string;
	title: string;
	children: ReactNode;
}

export function StudySection({ id, title, children }: StudySectionProps) {
	return (
		<Box id={id} sx={{ scrollMarginTop, py: { xs: 2, md: 3 } }}>
			<Typography variant='sectionHeading' sx={{ mb: { xs: 2, md: 2.5 } }}>
				{title}
			</Typography>
			{children}
		</Box>
	);
}
