import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { GridProps } from '@mui/material/Grid';
import { StudyCell } from './StudyCell';

interface StudyBulletListProps {
	items: ReactNode[];
	size: GridProps['size'];
}

export function StudyBulletList({ items, size }: StudyBulletListProps) {
	return (
		<StudyCell size={size}>
			<Box
				component='ul'
				sx={{
					m: 0,
					pl: 2.5,
					'& li': {
						mb: 0.75,
						'&:last-child': { mb: 0 },
					},
				}}>
				{items.map((item, index) => (
					<Box component='li' key={typeof item === 'string' ? item.slice(0, 48) : index}>
						<Typography variant='body1' component='div'>
							{item}
						</Typography>
					</Box>
				))}
			</Box>
		</StudyCell>
	);
}
