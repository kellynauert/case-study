import { createTheme, alpha } from '@mui/material/styles';

export const accent = '#7C3AED';
export const accentPink = '#DB2777';
export const accentLight = '#A78BFA';
export const background = '#FDFBFF';
export const surface = '#FFFFFF';
export const surfaceRaised = '#F8F5FF';
export const border = alpha('#4C1D95', 0.1);
export const borderHover = alpha('#7C3AED', 0.28);
export const textPrimary = '#1E1033';
export const textSecondary = '#5B4A6F';
export const textMuted = '#9B8AAF';
/** Inactive nav links — between muted and secondary */
export const textNav = '#5B4A6F';
export const gradient = `linear-gradient(135deg, ${accent} 0%, ${accentPink} 100%)`;
export const gradientSoft = `linear-gradient(135deg, ${alpha(accent, 0.1)} 0%, ${alpha(accentPink, 0.08)} 100%)`;
export const gradientText = {
	background: gradient,
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
};
export const shadowSubtle = 'none';
export const shadowElevated = 'none';
export const shadowImage = 'none';
export const fontDisplay = '"Fraunces", Georgia, "Times New Roman", serif';
export const fontBody = '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const layout = {
	navWidth: 360,
	contentMaxWidth: 640,
	pageMaxWidth: 1160,
	/** Nav column + gap + main column — keeps fixed nav aligned with content shell */
	shellMaxWidth: 360 + 1160 + 40,
	sectionSpacing: { xs: 8, md: 12 },
	readableWidth: '38rem',
	wideWidth: '56rem',
} as const;

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: accent },
		secondary: { main: accentPink },
		background: { default: background, paper: surface },
		text: { primary: textPrimary, secondary: textSecondary },
		divider: border,
	},
	typography: {
		fontFamily: fontBody,
		h1: {
			fontFamily: fontDisplay,
			fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
			fontWeight: 600,
			letterSpacing: '-0.035em',
			lineHeight: 1.08,
			color: textPrimary,
		},
		h2: {
			fontFamily: fontDisplay,
			fontSize: 'clamp(1.625rem, 3vw, 2rem)',
			fontWeight: 600,
			letterSpacing: '-0.025em',
			lineHeight: 1.2,
			color: textPrimary,
		},
		h3: {
			fontFamily: fontDisplay,
			fontSize: '1.0625rem',
			fontWeight: 600,
			letterSpacing: '-0.015em',
			lineHeight: 1.35,
			color: textPrimary,
			'@media (min-width:900px)': {
				fontSize: '1.125rem',
			},
		},
		sectionHeading: {
			fontFamily: fontDisplay,
			fontSize: '1.5rem',
			fontWeight: 400,
			// letterSpacing: '0.14em',
			// textTransform: 'uppercase',
			color: textPrimary,
			lineHeight: 1,
		},
		subsectionHeading: {
			fontFamily: fontBody,
			fontSize: '1.2rem',
			fontWeight: 800,

			lineHeight: 1,
			color: textSecondary,
		},
		detailHeading: {
			fontFamily: fontBody,
			fontSize: '1rem',
			fontWeight: 600,
			letterSpacing: '0.02em',
			lineHeight: 1.3,
			color: textMuted,
		},
		panelHeading: {
			fontFamily: fontDisplay,
			fontSize: '1.125rem',
			fontWeight: 600,
			lineHeight: 1.3,
			color: textPrimary,
		},
		displayTitle: {
			fontFamily: fontDisplay,
			fontSize: '1.1875rem',
			fontWeight: 600,
			lineHeight: 1.3,
			color: textPrimary,
			'@media (min-width:900px)': {
				fontSize: '1.25rem',
			},
		},
		pageTitle: {
			fontFamily: fontDisplay,
			fontSize: 'clamp(1.625rem, 3vw, 2rem)',
			fontWeight: 600,
			letterSpacing: '-0.025em',
			lineHeight: 1.15,
			color: textPrimary,
		},
		pageSubtitle: {
			fontFamily: fontBody,
			fontSize: '0.9375rem',
			fontWeight: 500,
			lineHeight: 1.5,
			color: textMuted,
			'@media (min-width:900px)': {
				fontSize: '1rem',
			},
		},
		body1: {
			fontSize: '0.9375rem',
			lineHeight: 1.7,
			color: textSecondary,
			'@media (min-width:900px)': {
				fontSize: '1rem',
			},
		},
		body2: {
			fontSize: '0.9375rem',
			lineHeight: 1.65,
			color: textSecondary,
		},
		subtitle1: {
			fontSize: '1rem',
			lineHeight: 1.55,
			color: textSecondary,
			fontWeight: 400,
		},
		caption: {
			fontSize: '0.875rem',
			letterSpacing: '0.02em',
			color: textMuted,
			fontWeight: 500,
		},
	},
	shape: { borderRadius: 8 },
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: background,
					scrollbarWidth: 'thin',
					scrollbarColor: `${alpha(accent, 0.3)} transparent`,
				},
				'::selection': { backgroundColor: alpha(accentPink, 0.22), color: textPrimary },
			},
		},
		MuiButtonBase: { defaultProps: { disableRipple: true } },
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					sectionHeading: 'h2',
					subsectionHeading: 'h3',
					detailHeading: 'h4',
					panelHeading: 'h3',
					displayTitle: 'h3',
					pageTitle: 'h1',
					pageSubtitle: 'p',
				},
			},
		},
	},
});

export const tokens = {
	accent,
	accentPink,
	accentLight,
	background,
	surface,
	surfaceRaised,
	border,
	borderHover,
	textPrimary,
	textSecondary,
	textMuted,
	textNav,
	gradient,
	gradientSoft,
	gradientText,
	shadowSubtle,
	shadowElevated,
	shadowImage,
	fontDisplay,
	fontBody,
	layout,
};
