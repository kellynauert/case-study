const STORAGE_KEY = 'mathtrack-viewed-sections';

/** End-of-section sentinel attr — intersection marks the section read. */
export const SECTION_COMPLETE_ATTR = 'data-section-complete';

type ViewedSectionsMap = Record<string, string[]>;

let cachedRaw: string | null = null;
let cachedMap: ViewedSectionsMap = {};

function readMap(): ViewedSectionsMap {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw === cachedRaw) return cachedMap;
		cachedRaw = raw;
		if (!raw) {
			cachedMap = {};
			return cachedMap;
		}
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
			cachedMap = {};
			return cachedMap;
		}
		const next: ViewedSectionsMap = {};
		for (const [slug, ids] of Object.entries(parsed)) {
			if (Array.isArray(ids)) {
				next[slug] = ids.filter((id): id is string => typeof id === 'string');
			}
		}
		cachedMap = next;
		return cachedMap;
	} catch {
		cachedRaw = null;
		cachedMap = {};
		return cachedMap;
	}
}

function writeMap(map: ViewedSectionsMap) {
	try {
		const next = JSON.stringify(map);
		localStorage.setItem(STORAGE_KEY, next);
		cachedRaw = next;
		cachedMap = map;
	} catch {
		// Ignore quota / private-mode failures
	}
}

export function getViewedSections(slug: string): string[] {
	return readMap()[slug] ?? [];
}

export function getAllViewedSections(): ViewedSectionsMap {
	return readMap();
}

export function markSectionViewed(slug: string, sectionId: string) {
	const map = readMap();
	const current = map[slug] ?? [];
	if (current.includes(sectionId)) return false;
	writeMap({ ...map, [slug]: [...current, sectionId] });
	return true;
}

export function isSectionViewed(slug: string, sectionId: string, viewed: readonly string[] = getViewedSections(slug)): boolean {
	return viewed.includes(sectionId);
}
