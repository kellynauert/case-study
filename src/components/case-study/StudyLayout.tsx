import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import type { GridProps } from '@mui/material/Grid';
import { StudyGrid } from './StudyGrid';
import { StudyCell } from './StudyCell';
import { scrollMarginTop } from '../../lib/styles';

type Cols = number;

/**
 * Optional width constraint. Prefer full-width prose or StudySplit —
 * never leave empty columns beside partial-width text.
 */
export function StudyCol({ children, cols = 12 }: { children: ReactNode; cols?: Cols }) {
	return <StudyCell size={{ xs: 12, md: cols }}>{children}</StudyCell>;
}

/**
 * Two-column layout for pairing two prose blocks (or two compact UI clips).
 * Do not put full-page screenshots here — those belong at 12 columns below the section text.
 */
export function StudySplit({
	left,
	right,
	leftCols = 6,
	rightCols = 6,
	size = 12,
}: {
	left: ReactNode;
	right: ReactNode;
	leftCols?: Cols;
	rightCols?: Cols;
	size?: GridProps['size'];
}) {
	return (
		<StudyCell size={size}>
			<StudyGrid spacing={2} columnSpacing={{ xs: 3, md: 5 }} sx={{ mb: 0, alignItems: 'flex-start' }}>
				<StudyCell size={{ xs: 12, md: leftCols }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						{left}
					</StudyGrid>
				</StudyCell>
				<StudyCell size={{ xs: 12, md: rightCols }}>
					<StudyGrid spacing={2} sx={{ mb: 0 }}>
						{right}
					</StudyGrid>
				</StudyCell>
			</StudyGrid>
		</StudyCell>
	);
}

export function StudyDetailTitle({ title, first = false, size = 12 }: { title: string; first?: boolean; size?: GridProps['size'] }) {
	return (
		<StudyCell size={size}>
			<Typography
				variant='detailHeading'
				sx={{
					m: 0,
					mt: first ? 0 : { xs: 1, md: 1.5 },
					mb: 0,
					scrollMarginTop,
				}}>
				{title}
			</Typography>
		</StudyCell>
	);
}
