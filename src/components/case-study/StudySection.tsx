import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { GridProps } from '@mui/material/Grid';
import type { ReactNode } from 'react';
import { SECTION_COMPLETE_ATTR } from '../../lib/viewedSections';
import { scrollMarginTop } from '../../lib/styles';
import { StudyCell } from './StudyCell';
import { StudyGrid } from './StudyGrid';

export const OUTLINE_ATTR = 'data-study-outline';

interface StudySectionProps {
	id: string;
	title?: string;
	size: GridProps['size'];
	children: ReactNode;
}

export function StudySectionHeading({ children }: { children: ReactNode }) {
	return (
		<Typography variant='sectionHeading' sx={{ mb: { xs: 3, md: 4 } }}>
			{children}
		</Typography>
	);
}

export function StudySection({ id, title, size, children }: StudySectionProps) {
	return (
		<StudyCell size={size}>
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
				<StudyGrid spacing={2} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0 }}>
					{children}
				</StudyGrid>
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
		</StudyCell>
	);
}
