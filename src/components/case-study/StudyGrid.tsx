import Grid from '@mui/material/Grid';
import type { ReactNode } from 'react';

interface StudyGridProps {
	children: ReactNode;
	spacing?: number;
}

export function StudyGrid({ children, spacing = 3 }: StudyGridProps) {
	return (
		<Grid container spacing={spacing} sx={{ mb: 2 }}>
			{children}
		</Grid>
	);
}
