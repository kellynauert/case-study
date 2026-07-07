import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { author } from '../../lib/site';
import { tokens } from '../../theme/theme';

export function Footer() {
	return (
		<Box
			component='footer'
			sx={{
				borderTop: `1px solid ${tokens.border}`,
				mt: { xs: 8, md: 12 },
			}}>
			<Box
				sx={{
					maxWidth: tokens.layout.pageMaxWidth,
					mx: 'auto',
					px: { xs: 2, sm: 3 },
					py: 4,
				}}>
				<Typography sx={{ m: 0, fontSize: '0.875rem', color: tokens.textMuted }}>
					{author.name} · {author.role}
				</Typography>
			</Box>
		</Box>
	);
}
