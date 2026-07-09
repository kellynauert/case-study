export function imageSrc(path: string): string {
	const base = import.meta.env.BASE_URL;
	let clean = path.trim().replace(/^\//, '');
	if (clean.startsWith('images/')) return `${base}${clean}`;
	return `${base}images/${clean}`;
}
