import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { tokens } from '../theme/theme';

/** Inline purple accent for hiring-manager highlights in body copy. */
export function Accent({ children }: { children: ReactNode }) {
	return (
		<Box component='span' sx={{ color: tokens.accent }}>
			{children}
		</Box>
	);
}
