import Typography from '@mui/material/Typography';
import type { GridProps } from '@mui/material/Grid';
import { OUTLINE_ATTR } from './StudySection';
import { scrollMarginTop } from '../../lib/styles';
import { StudyCell } from './StudyCell';

interface StudySubsectionProps {
	id: string;
	title: string;
	size: GridProps['size'];
	first?: boolean;
}

/** Level-2 heading that registers itself in the page outline / nav TOC. */
export function StudySubsection({ id, title, size, first = false }: StudySubsectionProps) {
	return (
		<StudyCell size={size}>
			<Typography
				id={id}
				variant='subsectionHeading'
				{...{
					[OUTLINE_ATTR]: '2',
					'data-outline-title': title,
				}}
				sx={{
					m: 0,
					mt: first ? { xs: 1, md: 1.5 } : { xs: 2.5, md: 3 },
					mb: 0,
					scrollMarginTop,
				}}>
				{title}
			</Typography>
		</StudyCell>
	);
}
