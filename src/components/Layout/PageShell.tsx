import Grid from '@mui/material/Grid';
import { pagePaddingX, pageTopPadding } from '../../lib/styles';
import { ScrollToTopButton } from './ScrollToTopButton';
import { tokens } from '../../theme/theme';

interface PageShellProps {
	footer?: React.ReactNode;
	children: React.ReactNode;
}

export function PageShell({ footer, children }: PageShellProps) {
	return (
		<Grid
			container
			sx={{
				width: '100%',
				maxWidth: tokens.layout.pageMaxWidth,
				px: pagePaddingX,
				pt: { xs: 2, md: pageTopPadding.md },
				pb: { xs: 6, md: 10 },
			}}>
			<Grid size={12}>{children}</Grid>

			{footer && (
				<Grid
					component='footer'
					size={12}
					sx={{
						pt: 6,
						mt: 8,
						borderTop: `1px solid ${tokens.border}`,
					}}>
					{footer}
					<ScrollToTopButton />
				</Grid>
			)}
		</Grid>
	);
}
