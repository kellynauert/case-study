import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { scrollMarginTop } from '../../lib/styles';

interface StudyCapabilityProps {
	id: string;
	title: string;
	children: ReactNode;
}

export function StudyCapability({ id, title, children }: StudyCapabilityProps) {
	return (
		<Box id={id} sx={{ scrollMarginTop, mb: { xs: 3, md: 3.5 }, '&:last-child': { mb: 0 } }}>
			<Typography variant='h3' sx={{ mb: { xs: 1.5, md: 2 } }}>
				{title}
			</Typography>
			{children}
		</Box>
	);
}
