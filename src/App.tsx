import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LightboxProvider } from './context/LightboxContext';
import { Lightbox } from './components/blocks/Lightbox';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { theme } from './theme/theme';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<LightboxProvider>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/case-studies/:slug' element={<CaseStudyPage />} />
					</Routes>
					<Lightbox />
				</LightboxProvider>
			</BrowserRouter>
		</ThemeProvider>
	);
}
