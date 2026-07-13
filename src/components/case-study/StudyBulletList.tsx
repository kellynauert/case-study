import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface StudyBulletListProps {
	items: ReactNode[];
}

export function StudyBulletList({ items }: StudyBulletListProps) {
	return (
		<Box
			component='ul'
			sx={{
				m: 0,
				mb: 2,
				pl: 2.5,
				'&:last-child': { mb: 0 },
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
	);
}
