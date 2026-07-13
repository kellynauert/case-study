import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

/** One-shot wipe of reading progress so a hard refresh shows the new-visitor state. Bump the id to clear again later. */
const PROGRESS_RESET_ID = '2026-07-13-study-complete-on-all-sections';
try {
	if (localStorage.getItem('mathtrack-progress-reset') !== PROGRESS_RESET_ID) {
		localStorage.removeItem('mathtrack-viewed-showcases');
		localStorage.removeItem('mathtrack-viewed-sections');
		localStorage.setItem('mathtrack-progress-reset', PROGRESS_RESET_ID);
	}
} catch {
	// Ignore private-mode / quota failures
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
