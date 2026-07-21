import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import { hero, links, resumeFilename } from '../../lib/site';
import { tokens } from '../../theme/theme';

const resumeLinkSx = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 0.75,
	px: 1,
	py: 0.75,
	m: 0,
	minHeight: 44,
	fontSize: '0.875rem',
	fontWeight: 600,
	letterSpacing: '0.02em',
	color: tokens.accentPink,
	bgcolor: 'transparent',
	border: 'none',
	textDecoration: 'none',
	cursor: 'pointer',
	whiteSpace: 'nowrap',
	transition: 'color 180ms ease, opacity 180ms ease',
	'&:hover': {
		color: tokens.accent,
		'& .resume-download-icon': { transform: 'translateY(1px)' },
	},
	'&:focus-visible': {
		outline: `2px solid ${tokens.accentPink}`,
		outlineOffset: 3,
		borderRadius: 1,
	},
} as const;

interface ResumeDownloadLinkProps {
	sx?: object;
	showLabel?: boolean;
}

export function ResumeDownloadLink({ sx, showLabel = true }: ResumeDownloadLinkProps) {
	return (
		<Box
			component='a'
			href={links.resume}
			download={resumeFilename}
			target='_blank'
			rel='noopener noreferrer'
			aria-label='Download resume PDF'
			sx={{ ...resumeLinkSx, ...sx }}>
			<DownloadIcon className='resume-download-icon' sx={{ fontSize: '1rem', transition: 'transform 180ms ease' }} />
			{showLabel ? hero.secondaryCta : null}
		</Box>
	);
}
