import Grid from '@mui/material/Grid';
import type { GridProps } from '@mui/material/Grid';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface StudyCellProps {
	children: ReactNode;
	size?: GridProps['size'];
	sx?: SxProps<Theme>;
}

export function StudyCell({ children, size = 12, sx }: StudyCellProps) {
	return (
		<Grid
			// @ts-ignore
			size={{
				xs: 12,
				...(typeof size === 'object' ? size : { lg: size }),
			}}
			sx={{ minWidth: 0, ...sx }}>
			{children}
		</Grid>
	);
}
