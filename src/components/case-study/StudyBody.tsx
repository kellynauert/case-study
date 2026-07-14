import Typography from '@mui/material/Typography';
import type { GridProps } from '@mui/material/Grid';
import type { ReactNode } from 'react';
import { StudyCell } from './StudyCell';
import type { SxProps, Theme } from '@mui/material/styles';

interface StudyBodyProps {
	children: ReactNode;
	size: GridProps['size'];
	sx?: SxProps<Theme>;
}

export function StudyBody({ children, size, sx }: StudyBodyProps) {
	return (
		<StudyCell size={size} sx={sx}>
			<Typography variant='body1' sx={{ m: 0, maxWidth: 'none' }}>
				{children}
			</Typography>
		</StudyCell>
	);
}
