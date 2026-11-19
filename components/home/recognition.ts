// Review platforms (strip at the bottom of the hero) and recognition badges ("Recognized by" row).
// Only list ratings, counts and badges the agency has genuinely earned.
// Badges: put the issuer's official badge file in public/images/badges/ and set `image`;
// until then the badge shows as a plain text tile (no imitation of the issuer's artwork).
// Add `href` with the public profile/verification URL so visitors can check it.

export type ReviewPlatform = { name: string; rating: string; count?: string; href?: string };
export type Badge = { name: string; detail?: string; image?: string; width?: number; height?: number; href?: string };

export const reviewPlatforms: ReviewPlatform[] = [
  { name: 'Trustpilot', rating: '4.9', count: '120+' },
  { name: 'Clutch', rating: '5.0' }, // add `count` once confirmed, e.g. '25+'
];

export const badges: Badge[] = [
  { name: 'Clutch', detail: 'Top-rated SEO specialist' },
  { name: 'Google Partner', detail: 'Certified agency' },
  { name: 'Trustpilot', detail: 'Rated 4.9 / 5' },
];

// Initials of the clients quoted in the reviews section (avatars in the hero strip).
export const reviewerInitials = ['JM', 'SK', 'DT', 'MR', 'AN', 'DP'];
