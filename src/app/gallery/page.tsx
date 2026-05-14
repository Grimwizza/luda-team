import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | The Crayons LUDA",
};

const PHOTOS = [
  {
    id: 1,
    src: "/hero/Evan - Action Shot - 2026.jpg",
    alt: "Evan making an action play",
    caption: "Play with heart.",
  },
  {
    id: 2,
    src: "/hero/Owen - Action Shot - 2026.jpg",
    alt: "Owen in action",
    caption: "Rise up, Crayons.",
  },
  {
    id: 3,
    src: "/hero/Matt & Eden - Hopkins Hustle - 2026.jpg",
    alt: "Matt and Eden at Hopkins Hustle",
    caption: "Hopkins Hustle 2026",
  },
  {
    id: 4,
    src: "/hero/Nick - Action Shot - 2026.jpg",
    alt: "Nick in action",
    caption: "Run. Catch. Win.",
  },
  {
    id: 5,
    src: "/hero/Logan - Action Shot - 2026.jpg",
    alt: "Logan making a play",
    caption: "Lakeville Ultimate.",
  },
  {
    id: 6,
    src: "/hero/Matt - Action Shot - 2026.jpg",
    alt: "Matt in action",
    caption: "This is LUDA.",
  },
];

const GOOGLE_PHOTOS_URL = "https://photos.app.goo.gl/BQm2qTJqvwRpShR99";

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
        {PHOTOS.map((photo) => (
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

    </div>
  );
}
