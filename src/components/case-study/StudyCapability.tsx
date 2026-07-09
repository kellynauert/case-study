import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { scrollMarginTop } from '../../lib/styles';
import { tokens } from '../../theme/theme';

interface StudyCapabilityProps {
	id: string;
	title: string;
	children: ReactNode;
}

export function StudyCapability({ id, title, children }: StudyCapabilityProps) {
	return (
		<Box id={id} sx={{ scrollMarginTop, mb: { xs: 3, md: 3.5 }, '&:last-child': { mb: 0 } }}>
			<Typography
				component='h3'
				sx={{
					m: 0,
					mb: { xs: 1.5, md: 2 },
					fontFamily: tokens.fontDisplay,
					fontSize: { xs: '1.0625rem', md: '1.125rem' },
					fontWeight: 600,
					lineHeight: 1.35,
					color: tokens.textPrimary,
				}}>
				{title}
			</Typography>
			{children}
		</Box>
	);
}
