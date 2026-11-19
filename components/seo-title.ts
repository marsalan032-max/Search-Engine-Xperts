// Adds the brand to a page title only when the result still fits in search results (~60 characters).
// Longer titles keep their keywords visible instead of being cut off mid-brand.
export const brandTitle = (title: string) => (title.length + 23 <= 60 ? `${title} | Search Engine Xperts` : title);
