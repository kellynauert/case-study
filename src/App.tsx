import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { A11yProvider } from './context/A11yContext';
import { LightboxProvider } from './context/LightboxContext';
import { Lightbox } from './components/blocks/Lightbox';
import { ScrollToTopOnNavigate } from './components/Layout/ScrollToTopOnNavigate';
import { LandingPage } from './pages/LandingPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { theme } from './theme/theme';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<A11yProvider>
				<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
					<ScrollToTopOnNavigate />
					<LightboxProvider>
						<Routes>
							<Route path='/' element={<LandingPage />} />
							<Route path='/case-studies/:slug' element={<CaseStudyPage />} />
						</Routes>
						<Lightbox />
					</LightboxProvider>
				</BrowserRouter>
			</A11yProvider>
		</ThemeProvider>
	);
}
