import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { author } from '../../lib/site';
import { pagePaddingX } from '../../lib/styles';
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
					px: pagePaddingX,
					py: 4,
				}}>
				<Typography variant='caption' sx={{ m: 0 }}>
					{author.name} · {author.role}
				</Typography>
			</Box>
		</Box>
	);
}
