export function generateImgUrl(path: string) {
	return new URL(`/assets/${path}`, import.meta.url).href;
}
