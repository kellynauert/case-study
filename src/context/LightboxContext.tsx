import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export interface LightboxImage {
	src: string;
	alt: string;
	caption?: string;
}

interface LightboxContextValue {
	images: LightboxImage[];
	currentIndex: number;
	isOpen: boolean;
	open: (images: LightboxImage[], index: number) => void;
	close: () => void;
	next: () => void;
	prev: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
	const [images, setImages] = useState<LightboxImage[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback((imgs: LightboxImage[], index: number) => {
		setImages(imgs);
		setCurrentIndex(index);
		setIsOpen(true);
	}, []);

	const close = useCallback(() => setIsOpen(false), []);

	const next = useCallback(() => {
		setCurrentIndex((i) => (i + 1) % images.length);
	}, [images.length]);

	const prev = useCallback(() => {
		setCurrentIndex((i) => (i - 1 + images.length) % images.length);
	}, [images.length]);

	return <LightboxContext.Provider value={{ images, currentIndex, isOpen, open, close, next, prev }}>{children}</LightboxContext.Provider>;
}

export function useLightbox() {
	const ctx = useContext(LightboxContext);
	if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
	return ctx;
}
