import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | The Crayons LUDA",
};

// Placeholder images — replace with Cloudinary URLs
const PLACEHOLDER_PHOTOS = Array.from({ length: 9 }, (_, i) => ({
  id:      i + 1,
  src:     `https://placehold.co/600x400/D00000/FFFFFF?text=Photo+${i + 1}`,
  alt:     `Team photo ${i + 1}`,
  caption: ["Game day!", "Tournament action", "Practice vibes", "The team!", "Disc goes up!", "Great catch", "Team huddle", "Celebrating a point", "Post-game"][i],
}));

const GOOGLE_PHOTOS_URL = "https://photos.google.com"; // TODO: Replace with real shared album URL

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-4xl font-black" style={{ color: "var(--fg)" }}>Gallery</h1>
        <a
          href={GOOGLE_PHOTOS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
          className="px-5 py-2.5 rounded-2xl font-bold text-sm hover:opacity-80 transition-opacity"
        >
          📷 Full Album on Google Photos
        </a>
      </div>
      <p className="font-semibold mb-12" style={{ color: "var(--fg-muted)" }}>
        Highlights from games, tournaments, and team moments.
      </p>

      {/* Photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {PLACEHOLDER_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            style={{ borderColor: "var(--card-border)" }}
            className="group relative rounded-3xl overflow-hidden border aspect-video bg-gray-100 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
              <p className="text-white font-bold text-sm px-4 py-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Cloudinary note */}
      <div
        style={{ backgroundColor: "var(--bg-muted)", borderColor: "var(--card-border)" }}
        className="mt-12 border rounded-3xl p-6 text-center"
      >
        <p className="font-bold" style={{ color: "var(--fg)" }}>📦 Cloudinary Integration Ready</p>
        <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
          Replace placeholder images with Cloudinary URLs — or wire up the Cloudinary SDK for dynamic image optimization.
        </p>
      </div>
    </div>
  );
}
