import Grid from '@mui/material/Grid';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface StudyGridProps {
	children: ReactNode;
	spacing?: number;
	sx?: SxProps<Theme>;
}

export function StudyGrid({ children, spacing = 3, sx }: StudyGridProps) {
	return (
		<Grid container spacing={spacing} sx={{ mb: 2, ...sx }}>
			{children}
		</Grid>
	);
}
