import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface StudyBodyProps {
	children: ReactNode;
}

export function StudyBody({ children }: StudyBodyProps) {
	return (
		<Typography variant='body1' sx={{ mb: 2, maxWidth: 'none', '&:last-child': { mb: 0 } }}>
			{children}
		</Typography>
	);
}
