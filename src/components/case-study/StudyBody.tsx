import Typography from '@mui/material/Typography';
import type { GridProps } from '@mui/material/Grid';
import type { ReactNode } from 'react';
import { StudyCell } from './StudyCell';

interface StudyBodyProps {
	children: ReactNode;
	size: GridProps['size'];
}

export function StudyBody({ children, size }: StudyBodyProps) {
	return (
		<StudyCell size={size}>
			<Typography variant='body1' sx={{ m: 0, maxWidth: 'none' }}>
				{children}
			</Typography>
		</StudyCell>
	);
}
