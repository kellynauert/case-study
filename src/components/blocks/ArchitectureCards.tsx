import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import type { CardItem } from '../../lib/parseMarkdown';
import { tokens } from '../../theme/theme';

const iconMap: Record<string, ReactNode> = {
	'ux design': <PaletteOutlinedIcon />,
	react: <CodeOutlinedIcon />,
	typescript: <DataObjectOutlinedIcon />,
	'node.js': <CodeOutlinedIcon />,
	postgresql: <StorageOutlinedIcon />,
	aws: <CloudOutlinedIcon />,
	infrastructure: <RocketLaunchOutlinedIcon />,
	networking: <LanOutlinedIcon />,
};

function getIcon(title: string): ReactNode {
	return iconMap[title.toLowerCase()] ?? <CodeOutlinedIcon />;
}

interface ArchitectureCardsProps {
	items: CardItem[];
}

export function ArchitectureCards({ items }: ArchitectureCardsProps) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
				gap: 1.5,
				my: 3,
			}}>
			{items.map((card) => (
				<Box
					key={card.title}
					sx={{
						p: 2,
						borderRadius: 1.5,
						border: `1px solid ${tokens.border}`,
						bgcolor: tokens.surfaceRaised,
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: 36,
							height: 36,
							borderRadius: 1,
							bgcolor: tokens.textPrimary,
							color: tokens.background,
							mb: 1.5,
							'& .MuiSvgIcon-root': { fontSize: 20 },
						}}>
						{getIcon(card.title)}
					</Box>
					<Typography variant='h3' sx={{ fontSize: '1rem', mb: 0.75 }}>
						{card.title}
					</Typography>
					<Typography variant='body2' sx={{ mb: 0 }}>
						{card.description}
					</Typography>
				</Box>
			))}
		</Box>
	);
}
