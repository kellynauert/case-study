import type { ComponentType } from 'react';

export interface StudySectionItem {
	id: string;
	title: string;
	level?: 1 | 2;
}

export interface TocHeading {
	id: string;
	title: string;
	level?: 1 | 2;
}

export interface StatItem {
	value: string;
	label: string;
}

export interface CaseStudyMeta {
	slug: string;
	title: string;
	subtitle: string;
	summary: string;
	years: string;
	order: number;
	readingMinutes: number;
}

export interface CaseStudyEntry extends CaseStudyMeta {
	component: ComponentType;
}

export function formatReadingTime(minutes: number): string {
	return `${minutes} min read`;
}
