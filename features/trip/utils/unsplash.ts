import { styleKeywords } from "@/constants/options";

export async function fetchUnsplashImages(
  location: string,
  travelStyle: string
): Promise<string[]> {
  // Get keywords for the travel style
  const keywords =
    styleKeywords[travelStyle.toLowerCase() as keyof typeof styleKeywords] || [];

  // Randomly select 2–3 keywords
  const chosen = keywords
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .join(" ");

  // Combine location and keywords
  const query = `${location} ${chosen}`;

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
  const res = await fetch(url);

  const imageUrls = (await res.json()).results
    .slice(0, 3)
    .map((result: any) => result.urls?.regular || null);

  return imageUrls;
}

export async function fetchNonTripUnsplashImages(query: string): Promise<string> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
  const res = await fetch(url);

  const imageUrl = ((await res.json()).results[0].urls?.regular as string) || "";
  return imageUrl;
}
