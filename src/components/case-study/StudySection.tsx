import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { scrollMarginTop } from '../../lib/styles';

export const OUTLINE_ATTR = 'data-study-outline';

interface StudySectionProps {
	id: string;
	title?: string;
	children: ReactNode;
}

export function StudySectionHeading({ children }: { children: ReactNode }) {
	return (
		<Typography variant='sectionHeading' sx={{ mb: { xs: 3, md: 4 } }}>
			{children}
		</Typography>
	);
}

export function StudySection({ id, title, children }: StudySectionProps) {
	return (
		<Box
			id={id}
			{...(title ?
				{
					[OUTLINE_ATTR]: '1',
					'data-outline-title': title,
				}
			:	{})}
			sx={{ scrollMarginTop, py: { xs: 3, md: 5 } }}>
			{title ?
				<StudySectionHeading>{title}</StudySectionHeading>
			:	null}
			{children}
		</Box>
	);
}
