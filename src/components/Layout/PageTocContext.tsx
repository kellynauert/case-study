import { createContext, useContext, useState, type ReactNode } from 'react';
import type { TocHeading } from '../../lib/caseStudyTypes';

export interface PageTocState {
	slug: string;
	headings: TocHeading[];
	activeId: string;
}

interface PageTocContextValue {
	pageToc: PageTocState | null;
	setPageToc: (toc: PageTocState | null) => void;
}

const PageTocContext = createContext<PageTocContextValue | null>(null);

export function PageTocProvider({ children }: { children: ReactNode }) {
	const [pageToc, setPageToc] = useState<PageTocState | null>(null);

	return <PageTocContext.Provider value={{ pageToc, setPageToc }}>{children}</PageTocContext.Provider>;
}

function usePageTocContext() {
	const ctx = useContext(PageTocContext);
	if (!ctx) throw new Error('usePageToc must be used within PageTocProvider');
	return ctx;
}

export function usePageToc() {
	return usePageTocContext().pageToc;
}

/** Publish in-page section links into GlobalNav (cleared on unmount). */
export function useSetPageToc() {
	return usePageTocContext().setPageToc;
}
