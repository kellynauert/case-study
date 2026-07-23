import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CloseIcon from '@mui/icons-material/Close';
import ContrastIcon from '@mui/icons-material/Contrast';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import LinkIcon from '@mui/icons-material/Link';
import MotionPhotosOffIcon from '@mui/icons-material/MotionPhotosOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import { alpha } from '@mui/material/styles';
import { useA11y } from '../../context/A11yContext';
import { hasActiveA11yOverrides } from '../../lib/a11yPreferences';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { tokens } from '../../theme/theme';

const BUTTON_SIZE = 44;
const PANEL_WIDTH = 300;

const reduceMotionSx = {
	'@media (prefers-reduced-motion: reduce)': { transition: 'none' },
	'html[data-a11y-motion="reduce"] &': { transition: 'none' },
} as const;

interface ToggleRowProps {
	label: string;
	description: string;
	icon: ReactNode;
	pressed: boolean;
	onToggle: () => void;
}

function ToggleRow({ label, description, icon, pressed, onToggle }: ToggleRowProps) {
	return (
		<Box
			component='button'
			type='button'
			aria-pressed={pressed}
			onClick={onToggle}
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				gap: 1.25,
				width: '100%',
				m: 0,
				p: 1.25,
				border: `1px solid ${pressed ? alpha(tokens.accent, 0.35) : tokens.border}`,
				borderRadius: 1,
				bgcolor: pressed ? alpha(tokens.accent, 0.08) : 'transparent',
				color: tokens.textPrimary,
				textAlign: 'left',
				cursor: 'pointer',
				transition: 'border-color 160ms ease, background-color 160ms ease',
				...reduceMotionSx,
				'&:hover': {
					borderColor: tokens.borderHover,
					bgcolor: pressed ? alpha(tokens.accent, 0.12) : alpha(tokens.accent, 0.04),
				},
				'&:focus-visible': {
					outline: `2px solid ${tokens.accent}`,
					outlineOffset: 2,
				},
			}}>
			<Box
				aria-hidden
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: 32,
					height: 32,
					flexShrink: 0,
					borderRadius: 1,
					color: pressed ? tokens.accent : tokens.textSecondary,
					bgcolor: pressed ? alpha(tokens.accent, 0.12) : alpha(tokens.textMuted, 0.1),
				}}>
				{icon}
			</Box>
			<Box sx={{ minWidth: 0, flex: 1, pt: 0.25 }}>
				<Typography sx={{ m: 0, fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.3, color: tokens.textPrimary }}>
					{label}
				</Typography>
				<Typography sx={{ m: 0, mt: 0.35, fontSize: '0.75rem', lineHeight: 1.4, color: tokens.textSecondary }}>
					{description}
				</Typography>
			</Box>
			<Box
				aria-hidden
				sx={{
					mt: 0.5,
					width: 36,
					height: 20,
					flexShrink: 0,
					borderRadius: 10,
					bgcolor: pressed ? tokens.accent : alpha(tokens.textMuted, 0.28),
					position: 'relative',
					transition: 'background-color 160ms ease',
					...reduceMotionSx,
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 2,
						left: pressed ? 18 : 2,
						width: 16,
						height: 16,
						borderRadius: '50%',
						bgcolor: '#fff',
						transition: 'left 160ms ease',
						...reduceMotionSx,
					},
				}}
			/>
		</Box>
	);
}

export function AccessibilityMenu() {
	const {
		prefs,
		increaseFontScale,
		decreaseFontScale,
		toggleHighContrast,
		toggleReduceMotion,
		toggleUnderlineLinks,
		toggleReadableSpacing,
		reset,
	} = useA11y();
	const [open, setOpen] = useState(false);
	const panelId = useId();
	const titleId = useId();
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const reducedMotion = useReducedMotion();
	const active = hasActiveA11yOverrides(prefs);

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				setOpen(false);
				triggerRef.current?.focus();
			}
		};

		const onPointerDown = (event: MouseEvent | PointerEvent) => {
			const target = event.target as Node | null;
			if (!target) return;
			if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
			setOpen(false);
		};

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('pointerdown', onPointerDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('pointerdown', onPointerDown);
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
			'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		firstFocusable?.focus();
	}, [open]);

	return (
		<>
			<IconButton
				ref={triggerRef}
				onClick={() => setOpen((value) => !value)}
				aria-label={open ? 'Close accessibility menu' : 'Open accessibility menu'}
				aria-expanded={open}
				aria-controls={open ? panelId : undefined}
				aria-haspopup='dialog'
				sx={{
					position: 'fixed',
					bottom: { xs: 'max(20px, env(safe-area-inset-bottom))', md: 28 },
					left: { xs: 'max(16px, env(safe-area-inset-left))', md: 28 },
					zIndex: 1300,
					width: BUTTON_SIZE,
					height: BUTTON_SIZE,
					color: open || active ? tokens.accent : tokens.textNav,
					border: `1px solid ${open || active ? alpha(tokens.accent, 0.35) : tokens.border}`,
					borderRadius: 1,
					bgcolor: alpha(tokens.surface, 0.94),
					backdropFilter: 'blur(8px)',
					boxShadow: tokens.shadowSubtle,
					transition: reducedMotion
						? 'color 180ms ease, border-color 180ms ease, background-color 180ms ease'
						: 'color 180ms ease, border-color 180ms ease, background-color 180ms ease',
					'&:hover': {
						color: tokens.accent,
						borderColor: tokens.borderHover,
						bgcolor: tokens.surfaceRaised,
					},
					'&:focus-visible': {
						outline: `2px solid ${tokens.accent}`,
						outlineOffset: 2,
					},
				}}>
				<AccessibilityNewIcon sx={{ fontSize: '1.25rem' }} />
			</IconButton>

			{open && (
				<Box
					ref={panelRef}
					id={panelId}
					role='dialog'
					aria-modal='false'
					aria-labelledby={titleId}
					sx={{
						position: 'fixed',
						bottom: {
							xs: `calc(${BUTTON_SIZE}px + max(20px, env(safe-area-inset-bottom)) + 12px)`,
							md: `calc(${BUTTON_SIZE}px + 28px + 12px)`,
						},
						left: { xs: 'max(16px, env(safe-area-inset-left))', md: 28 },
						zIndex: 1300,
						width: `min(${PANEL_WIDTH}px, calc(100vw - 32px))`,
						maxHeight: 'min(70vh, 520px)',
						overflow: 'auto',
						p: 1.5,
						border: `1px solid ${tokens.border}`,
						borderRadius: 1.5,
						bgcolor: alpha(tokens.surface, 0.98),
						backdropFilter: 'blur(12px)',
						boxShadow: `0 12px 40px ${alpha(tokens.textPrimary, 0.12)}`,
						display: 'flex',
						flexDirection: 'column',
						gap: 1.25,
					}}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 0.25 }}>
						<Typography
							id={titleId}
							component='h2'
							sx={{
								m: 0,
								flex: 1,
								fontFamily: tokens.fontDisplay,
								fontSize: '1.0625rem',
								fontWeight: 600,
								letterSpacing: '-0.02em',
								color: tokens.textPrimary,
							}}>
							Accessibility
						</Typography>
						<IconButton
							aria-label='Close accessibility menu'
							onClick={() => {
								setOpen(false);
								triggerRef.current?.focus();
							}}
							size='small'
							sx={{
								width: 32,
								height: 32,
								color: tokens.textSecondary,
								'&:hover': { color: tokens.accent, bgcolor: alpha(tokens.accent, 0.06) },
								'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
							}}>
							<CloseIcon sx={{ fontSize: '1.125rem' }} />
						</IconButton>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							p: 1.25,
							border: `1px solid ${tokens.border}`,
							borderRadius: 1,
						}}>
						<Box
							aria-hidden
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 32,
								height: 32,
								flexShrink: 0,
								borderRadius: 1,
								color: tokens.textSecondary,
								bgcolor: alpha(tokens.textMuted, 0.1),
							}}>
							<FormatSizeIcon sx={{ fontSize: '1.125rem' }} />
						</Box>
						<Box sx={{ flex: 1, minWidth: 0 }}>
							<Typography sx={{ m: 0, fontSize: '0.875rem', fontWeight: 600, color: tokens.textPrimary }}>
								Text size
							</Typography>
							<Typography sx={{ m: 0, mt: 0.25, fontSize: '0.75rem', color: tokens.textSecondary }}>
								{prefs.fontScale}%
							</Typography>
						</Box>
						<IconButton
							aria-label='Decrease text size'
							onClick={decreaseFontScale}
							disabled={prefs.fontScale <= 100}
							size='small'
							sx={{
								width: 36,
								height: 36,
								border: `1px solid ${tokens.border}`,
								borderRadius: 1,
								color: tokens.textPrimary,
								'&:hover': { borderColor: tokens.borderHover, color: tokens.accent },
								'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
								'&.Mui-disabled': { opacity: 0.35 },
							}}>
							<TextDecreaseIcon sx={{ fontSize: '1.05rem' }} />
						</IconButton>
						<IconButton
							aria-label='Increase text size'
							onClick={increaseFontScale}
							disabled={prefs.fontScale >= 130}
							size='small'
							sx={{
								width: 36,
								height: 36,
								border: `1px solid ${tokens.border}`,
								borderRadius: 1,
								color: tokens.textPrimary,
								'&:hover': { borderColor: tokens.borderHover, color: tokens.accent },
								'&:focus-visible': { outline: `2px solid ${tokens.accent}`, outlineOffset: 2 },
								'&.Mui-disabled': { opacity: 0.35 },
							}}>
							<TextIncreaseIcon sx={{ fontSize: '1.05rem' }} />
						</IconButton>
					</Box>

					<ToggleRow
						label='High contrast'
						description='Stronger text and border contrast'
						icon={<ContrastIcon sx={{ fontSize: '1.125rem' }} />}
						pressed={prefs.highContrast}
						onToggle={toggleHighContrast}
					/>
					<ToggleRow
						label='Reduce motion'
						description='Limit animations and smooth scrolling'
						icon={<MotionPhotosOffIcon sx={{ fontSize: '1.125rem' }} />}
						pressed={prefs.reduceMotion}
						onToggle={toggleReduceMotion}
					/>
					<ToggleRow
						label='Underline links'
						description='Always show underlines on links'
						icon={<LinkIcon sx={{ fontSize: '1.125rem' }} />}
						pressed={prefs.underlineLinks}
						onToggle={toggleUnderlineLinks}
					/>
					<ToggleRow
						label='Readable spacing'
						description='Increase letter and line spacing'
						icon={<FormatLineSpacingIcon sx={{ fontSize: '1.125rem' }} />}
						pressed={prefs.readableSpacing}
						onToggle={toggleReadableSpacing}
					/>

					<Button
						onClick={reset}
						disabled={!active}
						startIcon={<RestartAltIcon sx={{ fontSize: '1.05rem !important' }} />}
						sx={{
							mt: 0.25,
							alignSelf: 'stretch',
							justifyContent: 'center',
							textTransform: 'none',
							fontWeight: 600,
							fontSize: '0.8125rem',
							color: tokens.textSecondary,
							border: `1px solid ${tokens.border}`,
							borderRadius: 1,
							py: 0.85,
							'&:hover': {
								color: tokens.accent,
								borderColor: tokens.borderHover,
								bgcolor: alpha(tokens.accent, 0.04),
							},
							'&:focus-visible': {
								outline: `2px solid ${tokens.accent}`,
								outlineOffset: 2,
							},
							'&.Mui-disabled': {
								opacity: 0.4,
								color: tokens.textMuted,
							},
						}}>
						Reset preferences
					</Button>
				</Box>
			)}
		</>
	);
}
