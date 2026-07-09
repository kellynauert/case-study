import { tokens } from '../theme/theme';

/** Uppercase section labels — Feature Showcase, Gallery, case study chapters */

export const sectionHeadingSx = {
	m: 0,

	mb: { xs: 2.5, md: 3 },

	fontFamily: tokens.fontBody,

	fontSize: { xs: '0.875rem', md: '0.9375rem' },

	fontWeight: 600,

	letterSpacing: '0.14em',

	textTransform: 'uppercase',

	color: tokens.textSecondary,

	lineHeight: 1.4,
} as const;

/** Fraunces panel titles — e.g. The MathTrack App */

export const panelHeadingSx = {
	m: 0,

	fontFamily: tokens.fontDisplay,

	fontSize: '1.125rem',

	fontWeight: 600,

	lineHeight: 1.3,

	color: tokens.textPrimary,
} as const;

/** Fraunces card / page titles */

export const displayTitleSx = {
	m: 0,

	fontFamily: tokens.fontDisplay,

	fontSize: { xs: '1.1875rem', md: '1.25rem' },

	fontWeight: 600,

	lineHeight: 1.3,

	color: tokens.textPrimary,
} as const;

/** Standard body copy */

export const bodyTextSx = {
	fontSize: { xs: '0.9375rem', md: '1rem' },

	lineHeight: 1.7,

	color: tokens.textSecondary,
} as const;

/** Secondary lines — card teasers, subtitles */

export const secondaryTextSx = {
	fontSize: '1rem',

	lineHeight: 1.55,

	color: tokens.textSecondary,
} as const;

/** Captions and meta — footers, gallery count, read time */

export const captionTextSx = {
	fontSize: '0.875rem',

	color: tokens.textMuted,
} as const;

export const pagePaddingX = { xs: 2, sm: 3 } as const;

/** Fixed mobile header height — keep in sync with GlobalNav mobile bar */

export const mobileHeaderHeight = 56;

export const pageTopPadding = { xs: 2, md: 5 } as const;

export const contentGridGap = { xs: 2, sm: 1.75, md: 1.5 } as const;

export const scrollMarginTop = '1.5rem' as const;
