import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { scrollMarginTop } from '../../lib/styles';

interface StudySectionProps {
	id: string;
	title?: string;
	children: ReactNode;
}

export function StudySectionHeading({ children }: { children: ReactNode }) {
	return (
		<Typography variant='sectionHeading' sx={{ mb: { xs: 3, md: 4 } }}>
			{children}
		</Typography>
	);
}

export function StudySection({ id, title, children }: StudySectionProps) {
	return (
		<Box id={id} sx={{ scrollMarginTop, py: { xs: 3, md: 5 } }}>
			{title ?
				<StudySectionHeading>{title}</StudySectionHeading>
			:	null}
			{children}
		</Box>
	);
}
