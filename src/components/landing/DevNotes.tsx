import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { devNotes } from '../../lib/site';
import { tokens } from '../../theme/theme';

const statusMark = {
	ok: {
		symbol: '✓',
		color: tokens.green,
		wash: alpha(tokens.green, 0.1),
		border: alpha(tokens.green, 0.22),
	},
	info: {
		symbol: 'ℹ',
		color: tokens.accent,
		wash: alpha(tokens.accent, 0.1),
		border: alpha(tokens.accent, 0.22),
	},
	warn: {
		symbol: '⚠',
		color: tokens.accentPink,
		wash: alpha(tokens.accentPink, 0.1),
		border: alpha(tokens.accentPink, 0.22),
	},
} as const;

export function DevNotes() {
	return (
		<Box
			component='section'
			aria-label={devNotes.heading}
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				borderRadius: 1,
				border: `1.5px solid ${alpha(tokens.accentPink, 0.18)}`,
				background: `linear-gradient(160deg, #FDF2F8 0%, #F5F3FF 45%, #F8F5FF 100%)`,
				overflow: 'hidden',
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 0.85,
					px: 1.25,
					py: 0.8,
					borderBottom: `1px dashed ${alpha(tokens.accent, 0.18)}`,
					bgcolor: alpha('#fff', 0.35),
				}}>
				<Box sx={{ display: 'flex', gap: 0.55 }} aria-hidden>
					{(
						[
							{ color: tokens.accentPink, label: 'close' },
							{ color: '#EAB308', label: 'minimize' },
							{ color: '#22C55E', label: 'maximize' },
						] as const
					).map((dot) => (
						<Box
							key={dot.label}
							sx={{
								width: 8,
								height: 8,
								borderRadius: '50%',
								bgcolor: dot.color,
								border: `1px solid ${alpha('#000', 0.06)}`,
							}}
						/>
					))}
				</Box>
				<Typography variant='devNotesTitle' sx={{ m: 0 }}>
					{`${devNotes.commentTitle.toLowerCase()}`}
				</Typography>
			</Box>

			<Box
				component='ul'
				sx={{
					m: 0,
					px: 1.15,
					py: 1.15,
					listStyle: 'none',
					display: 'flex',
					flexDirection: 'column',
					gap: 0.75,
					flex: 1,
				}}>
				{devNotes.items.map((item) => {
					const mark = statusMark[item.status];
					return (
						<Box
							key={item.summary}
							component='li'
							sx={{
								m: 0,
								display: 'grid',
								gridTemplateColumns: '1rem 1fr',
								columnGap: 0.85,
								alignItems: 'start',
								px: 1,
								py: 0.75,
								borderRadius: 1,
								bgcolor: mark.wash,
								border: `1px solid ${mark.border}`,
							}}>
							<Typography variant='devNotesMark' component='span' aria-hidden sx={{ m: 0, color: mark.color }}>
								{mark.symbol}
							</Typography>
							<Box sx={{ minWidth: 0 }}>
								<Typography variant='devNotesBody' sx={{ m: 0 }}>
									{item.summary}
								</Typography>
								{'notes' in item &&
									item.notes?.map((note, noteIndex) =>
										note ?
											<Typography key={`${item.summary}-${noteIndex}`} variant='devNotesMeta' sx={{ m: 0, mt: 0.35 }}>
												{note}
											</Typography>
										:	<Box key={`${item.summary}-gap-${noteIndex}`} sx={{ height: '0.55em' }} />
									)}
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
