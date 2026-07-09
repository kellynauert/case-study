import Grid from '@mui/material/Grid';
import type { GridProps } from '@mui/material/Grid';
import type { ReactNode } from 'react';

interface StudyCellProps {
	children: ReactNode;
	size?: GridProps['size'];
}

export function StudyCell({ children, size = { xs: 12 } }: StudyCellProps) {
	return (
		<Grid size={size} sx={{ minWidth: 0 }}>
			{children}
		</Grid>
	);
}
