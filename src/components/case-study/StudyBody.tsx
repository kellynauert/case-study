import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { bodyTextSx } from '../../lib/styles';

interface StudyBodyProps {
	children: ReactNode;
}

export function StudyBody({ children }: StudyBodyProps) {
	return (
		<Typography component='p' sx={{ ...bodyTextSx, mb: 2, maxWidth: 'none', '&:last-child': { mb: 0 } }}>
			{children}
		</Typography>
	);
}
