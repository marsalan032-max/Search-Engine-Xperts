// First breadcrumb item on every page: a house icon linking home.
// The visible "Home" text is replaced by the icon; aria-label keeps it announced as "Home".
// (Breadcrumb schema still names this item "Home".)
export function HomeCrumb() {
  return <a href="/" className="crumb-home" aria-label="Home" title="Home">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  </a>;
}
