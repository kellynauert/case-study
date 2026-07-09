import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface StudyBulletListProps {
	items: string[];
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
			{items.map((item) => (
				<Box component='li' key={item.slice(0, 48)}>
					<Typography variant='body1'>{item}</Typography>
				</Box>
			))}
		</Box>
	);
}
