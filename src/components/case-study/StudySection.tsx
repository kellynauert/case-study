import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { SECTION_COMPLETE_ATTR } from '../../lib/viewedSections';
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
			{title ?
				<Box
					component='span'
					aria-hidden
					{...{ [SECTION_COMPLETE_ATTR]: id }}
					sx={{
						display: 'block',
						width: '100%',
						height: 1,
						mt: 0,
						pointerEvents: 'none',
					}}
				/>
			:	null}
		</Box>
	);
}
