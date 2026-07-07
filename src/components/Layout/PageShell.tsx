import Box from '@mui/material/Box';
import { tokens } from '../../theme/theme';

interface PageShellProps {
	navigation?: React.ReactNode;
	footer?: string;
	children: React.ReactNode;
}

export function PageShell({ navigation, footer, children }: PageShellProps) {
	return (
		<Box sx={{ display: 'flex', minHeight: 'calc(100vh - 4rem)' }}>
			<Box sx={{ display: 'flex', width: '100%', maxWidth: tokens.layout.pageMaxWidth, mx: 'auto' }}>
				{navigation}

				<Box
					component='article'
					sx={{
						flex: 1,
						minWidth: 0,
						px: { xs: 2, sm: 3, md: 4 },
						py: { xs: 4, md: 6 },
						pb: { xs: 6, md: 10 },
					}}>
					{children}

					{footer && (
						<Box
							component='footer'
							sx={{
								pt: 6,
								mt: 8,
								borderTop: `1px solid ${tokens.border}`,
							}}>
							<Box
								component='p'
								sx={{
									m: 0,
									fontSize: '0.875rem',
									color: tokens.textMuted,
								}}>
								{footer}
							</Box>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
}
