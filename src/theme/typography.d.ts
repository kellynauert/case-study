import type { CSSObject } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		sectionHeading: CSSObject;
		panelHeading: CSSObject;
		displayTitle: CSSObject;
		pageTitle: CSSObject;
	}

	interface TypographyVariantsOptions {
		sectionHeading?: CSSObject;
		panelHeading?: CSSObject;
		displayTitle?: CSSObject;
		pageTitle?: CSSObject;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		sectionHeading: true;
		panelHeading: true;
		displayTitle: true;
		pageTitle: true;
	}
}

export {};
