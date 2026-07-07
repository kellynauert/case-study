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
export const gradient = `linear-gradient(135deg, ${accent} 0%, ${accentPink} 100%)`;
export const gradientSoft = `linear-gradient(135deg, ${alpha(accent, 0.1)} 0%, ${alpha(accentPink, 0.08)} 100%)`;
export const gradientText = {
	background: gradient,
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
};
export const shadowSubtle = `0 2px 8px ${alpha('#7C3AED', 0.08)}`;
export const shadowElevated = `0 8px 24px ${alpha('#7C3AED', 0.12)}`;
export const shadowImage = `0 12px 40px ${alpha('#7C3AED', 0.14)}`;
export const fontDisplay = '"Fraunces", Georgia, "Times New Roman", serif';
export const fontBody = '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const layout = {
	navWidth: 200,
	contentMaxWidth: 640,
	pageMaxWidth: 1160,
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
			fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
			fontWeight: 600,
			letterSpacing: '-0.035em',
			lineHeight: 1.08,
			color: textPrimary,
		},
		h2: {
			fontFamily: fontDisplay,
			fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
			fontWeight: 600,
			letterSpacing: '-0.025em',
			lineHeight: 1.2,
			color: textPrimary,
		},
		h3: {
			fontFamily: fontBody,
			fontSize: '1.0625rem',
			fontWeight: 600,
			letterSpacing: '-0.015em',
			lineHeight: 1.35,
			color: textPrimary,
		},
		body1: {
			fontSize: '1.0625rem',
			lineHeight: 1.75,
			color: textSecondary,
		},
		body2: {
			fontSize: '0.9375rem',
			lineHeight: 1.65,
			color: textSecondary,
		},
		subtitle1: {
			fontSize: '1.1875rem',
			lineHeight: 1.6,
			color: textSecondary,
			fontWeight: 400,
		},
		caption: {
			fontSize: '0.8125rem',
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
