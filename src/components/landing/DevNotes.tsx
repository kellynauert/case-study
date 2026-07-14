import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { SvgIconComponent } from '@mui/icons-material';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import { devNotes } from '../../lib/site';
import { tokens } from '../../theme/theme';

const statusMark = {
	ok: {
		color: tokens.green,
		wash: alpha(tokens.green, 0.1),
		border: alpha(tokens.green, 0.22),
	},
	info: {
		color: tokens.accent,
		wash: alpha(tokens.accent, 0.1),
		border: alpha(tokens.accent, 0.22),
	},
	warn: {
		color: tokens.accentPink,
		wash: alpha(tokens.accentPink, 0.1),
		border: alpha(tokens.accentPink, 0.22),
	},
} as const;

const noteIcons: Record<(typeof devNotes.items)[number]['icon'], SvgIconComponent> = {
	gaming: SportsEsportsRoundedIcon,
	cat: PetsRoundedIcon,
	teacup: LocalCafeRoundedIcon,
};

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
				sx={{
					m: 0,
					px: 1.15,
					py: 1.15,
					display: 'flex',
					flexDirection: 'column',
					gap: 0.75,
					flex: 1,
				}}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'baseline',
						justifyContent: 'space-between',
						gap: 1,
						px: 0.25,
						pb: 0.15,
					}}>
					<Typography
						variant='devNotesBody'
						sx={{
							m: 0,
							fontWeight: 700,
							color: tokens.accentPink,
						}}>
						{devNotes.introTitle}
					</Typography>
					<Typography
						variant='devNotesMeta'
						sx={{
							m: 0,
							flexShrink: 0,
							fontWeight: 500,
							color: tokens.textMuted,
						}}>
						{new Date().toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</Typography>
				</Box>

				<Box
					component='ul'
					sx={{
						m: 0,
						p: 0,
						listStyle: 'none',
						display: 'flex',
						flexDirection: 'column',
						gap: 0.75,
						flex: 1,
					}}>
					{devNotes.items.map((item) => {
						const mark = statusMark[item.status];
						const Icon = noteIcons[item.icon];
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
								<Icon aria-hidden sx={{ fontSize: '1rem', mt: 'calc(0.1rem + 2px)', color: mark.color }} />
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
		</Box>
	);
}
