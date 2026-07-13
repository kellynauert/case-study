import Typography from '@mui/material/Typography';
import { OUTLINE_ATTR } from './StudySection';
import { scrollMarginTop } from '../../lib/styles';

interface StudySubsectionProps {
	id: string;
	title: string;
	first?: boolean;
}

/** Level-2 heading that registers itself in the page outline / nav TOC. */
export function StudySubsection({ id, title, first = false }: StudySubsectionProps) {
	return (
		<Typography
			id={id}
			variant='subsectionHeading'
			{...{
				[OUTLINE_ATTR]: '2',
				'data-outline-title': title,
			}}
			sx={{
				m: 0,
				mt: first ? { xs: 2.5, md: 3 } : { xs: 4, md: 5 },
				mb: 1.5,
				scrollMarginTop,
			}}>
			{title}
		</Typography>
	);
}
