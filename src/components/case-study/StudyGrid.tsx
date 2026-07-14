import Grid from '@mui/material/Grid';
import type { GridProps } from '@mui/material/Grid';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface StudyGridProps {
	children: ReactNode;
	spacing?: GridProps['spacing'];
	columnSpacing?: GridProps['columnSpacing'];
	rowSpacing?: GridProps['rowSpacing'];
	sx?: SxProps<Theme>;
}

export function StudyGrid({ children, spacing = 3, columnSpacing, rowSpacing, sx }: StudyGridProps) {
	return (
		<Grid
			container
			spacing={spacing}
			columnSpacing={columnSpacing}
			rowSpacing={rowSpacing}
			sx={{ width: '100%', mb: 2, alignItems: 'flex-start', ...sx }}>
			{children}
		</Grid>
	);
}
