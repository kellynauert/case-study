import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { GridProps } from '@mui/material/Grid';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import { SECTION_COMPLETE_ATTR } from '../../lib/viewedSections';
import { scrollMarginTop } from '../../lib/styles';
import { StudyCell } from './StudyCell';
import { StudyGrid } from './StudyGrid';

export const OUTLINE_ATTR = 'data-study-outline';

interface StudySectionTitleProps {
	id: string;
	title: string;
	size?: GridProps['size'];
}

/** Level-1 heading that registers itself in the page outline / nav TOC. */
export function StudySectionTitle({ id, title, size = 12 }: StudySectionTitleProps) {
	return (
		<StudyCell size={size}>
			<Typography
				id={id}
				variant='sectionHeading'
				{...{
					[OUTLINE_ATTR]: '1',
					'data-outline-title': title,
				}}
				sx={{
					m: 0,
					mb: { xs: 3, lg: 4 },
					scrollMarginTop,
				}}>
				{title}
			</Typography>
		</StudyCell>
	);
}

interface StudySectionProps {
	/** Marks the end of this section for read tracking. Use the same id as StudySectionTitle. */
	id?: string;
	size: GridProps['size'];
	children: ReactNode;
	sx?: SxProps<Theme>;
}

/** Layout shell for a case-study section. Place StudySectionTitle (and content) as children. */
export function StudySection({ id, size, children, sx }: StudySectionProps) {
	return (
		<StudyCell size={size}>
			<Box sx={{ py: { xs: 3, md: 5 } }}>
				<StudyGrid spacing={2} columnSpacing={{ xs: 3, lg: 5 }} sx={{ mb: 0, ...sx }}>
					{children}
				</StudyGrid>
				{id ?
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
