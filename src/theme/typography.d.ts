import type { CSSProperties } from 'react';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		sectionHeading: CSSProperties;
		panelHeading: CSSProperties;
		displayTitle: CSSProperties;
	}

	interface TypographyVariantsOptions {
		sectionHeading?: CSSProperties;
		panelHeading?: CSSProperties;
		displayTitle?: CSSProperties;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		sectionHeading: true;
		panelHeading: true;
		displayTitle: true;
	}
}

export {};
