import type { CSSObject } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		sectionHeading: CSSObject;
		subsectionHeading: CSSObject;
		detailHeading: CSSObject;
		panelHeading: CSSObject;
		displayTitle: CSSObject;
		pageTitle: CSSObject;
		pageSubtitle: CSSObject;
	}

	interface TypographyVariantsOptions {
		sectionHeading?: CSSObject;
		subsectionHeading?: CSSObject;
		detailHeading?: CSSObject;
		panelHeading?: CSSObject;
		displayTitle?: CSSObject;
		pageTitle?: CSSObject;
		pageSubtitle?: CSSObject;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		sectionHeading: true;
		subsectionHeading: true;
		detailHeading: true;
		panelHeading: true;
		displayTitle: true;
		pageTitle: true;
		pageSubtitle: true;
	}
}

export {};
