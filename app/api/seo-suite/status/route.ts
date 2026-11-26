import { json, liveData } from '../_lib/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Tells the page whether live metrics (DataForSEO) are connected.
export function GET() {
  return json({ live: liveData() });
}
