import { useMemo, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { slugify } from '../../lib/slugify';
import { bodyTextSx, scrollMarginTop, sectionHeadingSx } from '../../lib/styles';
import { tokens } from '../../theme/theme';

interface MarkdownRendererProps {
	content: string;
	isHero?: boolean;
	wide?: boolean;
	columnFlow?: boolean;
}

function buildProseSx(wide: boolean) {
	return {
		'& p': {
			...bodyTextSx,
			mb: 2,
			maxWidth: wide ? 'none' : tokens.layout.readableWidth,
			breakInside: 'avoid',
		},
		'& p:last-child': { mb: 0 },
		'& ul, & ol': {
			pl: 2,
			mb: 2,
			maxWidth: wide ? 'none' : tokens.layout.readableWidth,
			color: tokens.textSecondary,
			breakInside: 'avoid',
		},
		'& li': {
			fontSize: bodyTextSx.fontSize,
			lineHeight: 1.65,
			mb: 0.5,
		},
		'& li::marker': { color: tokens.accent },
		'& hr': {
			border: 'none',
			borderTop: `1px solid ${tokens.border}`,
			my: 2,
		},
		'& blockquote': {
			m: 0,
			my: 3,
			p: 0,
			border: 'none',
			'& p': {
				fontSize: { xs: '0.9375rem', md: '1rem' },
				fontStyle: 'italic',
				color: tokens.textPrimary,
				lineHeight: 1.6,
				mb: 0,
				maxWidth: wide ? 'none' : tokens.layout.readableWidth,
			},
		},
		'& a': {
			color: tokens.accent,
			fontWeight: 500,
			textDecoration: 'none',
			overflowWrap: 'anywhere',
			borderBottom: `1px solid ${alpha(tokens.accentPink, 0.35)}`,
			transition: 'color 200ms ease, border-color 200ms ease',
			'&:hover': {
				color: tokens.accentPink,
				borderBottomColor: tokens.accentPink,
			},
		},
		'& strong': { color: tokens.textPrimary, fontWeight: 600 },
		'& em': { fontStyle: 'italic' },
		'& p, & li': { overflowWrap: 'anywhere' },
	};
}

export function MarkdownRenderer({ content, isHero = false, wide = false, columnFlow = false }: MarkdownRendererProps) {
	const proseSx = useMemo(() => buildProseSx(wide || columnFlow), [wide, columnFlow]);

	const components = useMemo(
		() => ({
			h1: () => null,
			h2: ({ children }: { children?: ReactNode }) => {
				const text = String(children);
				const id = slugify(text);
				return (
					<Box id={id} sx={{ mt: 3, mb: 1.5, scrollMarginTop }}>
						<Typography component='h3' sx={{ ...sectionHeadingSx, mb: 0 }}>
							{text}
						</Typography>
					</Box>
				);
			},
			h3: ({ children }: { children?: ReactNode }) => (
				<Typography
					component='h4'
					sx={{
						mt: 2,
						mb: 1,
						fontFamily: tokens.fontBody,
						fontSize: { xs: '0.9375rem', md: '1rem' },
						fontWeight: 600,
						lineHeight: 1.4,
						color: tokens.textPrimary,
					}}>
					{children}
				</Typography>
			),
			p: ({ children }: { children?: ReactNode }) => (
				<Box component='p' sx={proseSx['& p']}>
					{children}
				</Box>
			),
		}),
		[proseSx]
	);

	if (!content.trim()) return null;

	return (
		<Box
			sx={{
				...proseSx,
				'& blockquote': { ...proseSx['& blockquote'], my: isHero ? 2 : 3 },
				...(columnFlow ?
					{
						columnCount: { xs: 1, md: 2 },
						columnGap: { md: 3 },
					}
				:	{}),
			}}>
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
				{content}
			</ReactMarkdown>
		</Box>
	);
}
