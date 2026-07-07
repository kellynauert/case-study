import { useMemo, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { slugify } from '../../lib/slugify';
import { tokens } from '../../theme/theme';

interface MarkdownRendererProps {
	content: string;
	isHero?: boolean;
	columns?: boolean;
}

function buildProseSx(columns: boolean) {
	return {
		'& p': {
			fontSize: '1.0625rem',
			lineHeight: 1.7,
			color: tokens.textSecondary,
			mb: 2,
			maxWidth: columns ? 'none' : tokens.layout.readableWidth,
			breakInside: 'avoid',
		},
		'& p:last-child': { mb: 0 },
		'& ul, & ol': {
			pl: 2,
			mb: 2,
			maxWidth: columns ? 'none' : tokens.layout.readableWidth,
			color: tokens.textSecondary,
			breakInside: 'avoid',
		},
		'& li': {
			fontSize: '1.0625rem',
			lineHeight: 1.65,
			mb: 0.5,
		},
		'& li::marker': { color: tokens.accent },
		'& hr': {
			border: 'none',
			borderTop: `1px solid ${tokens.border}`,
			my: 2,
			columnSpan: 'all',
		},
		'& blockquote': {
			m: 0,
			my: 3,
			p: 0,
			border: 'none',
			columnSpan: 'all',
			'& p': {
				fontSize: { xs: '1.125rem', md: '1.25rem' },
				fontStyle: 'italic',
				color: tokens.textPrimary,
				lineHeight: 1.6,
				mb: 0,
				maxWidth: columns ? 'none' : tokens.layout.readableWidth,
			},
		},
		'& a': {
			color: tokens.accent,
			fontWeight: 500,
			textDecoration: 'none',
			borderBottom: `1px solid ${alpha(tokens.accentPink, 0.35)}`,
			transition: 'color 200ms ease, border-color 200ms ease',
			'&:hover': {
				color: tokens.accentPink,
				borderBottomColor: tokens.accentPink,
			},
		},
		'& strong': { color: tokens.textPrimary, fontWeight: 600 },
		'& em': { fontStyle: 'italic' },
	};
}

export const caseStudyColumnSx = {
	columnCount: { xs: 1, md: 2 },
	columnGap: { md: 5 },
	...buildProseSx(true),
};

export function MarkdownRenderer({ content, isHero = false, columns = false }: MarkdownRendererProps) {
	const proseSx = useMemo(() => buildProseSx(columns), [columns]);

	const components = useMemo(
		() => ({
			h1: () => null,
			h2: ({ children }: { children?: ReactNode }) => {
				const text = String(children);
				const id = slugify(text);
				return (
					<Box
						id={id}
						sx={{
							mt: 4,
							mb: 2,
							scrollMarginTop: '1.5rem',
							...(columns ? { columnSpan: 'all' } : {}),
						}}>
						<Typography variant='h3' component='h3' sx={{ fontSize: '1.125rem', mb: 0 }}>
							{text}
						</Typography>
					</Box>
				);
			},
			h3: ({ children }: { children?: ReactNode }) => (
				<Typography
					variant='h3'
					component='h4'
					sx={{
						mt: 2.5,
						mb: 1,
						fontSize: '1rem',
						...(columns ? { columnSpan: 'all' } : {}),
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
		[columns, proseSx]
	);

	if (!content.trim()) return null;

	return (
		<Box sx={columns ? { display: 'contents' } : { ...proseSx, '& blockquote': { ...proseSx['& blockquote'], my: isHero ? 2 : 3 } }}>
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
				{content}
			</ReactMarkdown>
		</Box>
	);
}
