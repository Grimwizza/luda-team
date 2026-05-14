import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "The Crayons — LUDA",
    short_name:       "LUDA",
    description:      "Lakeville Ultimate Disc Association — high school ultimate frisbee.",
    start_url:        "/",
    display:          "standalone",
    background_color: "#ffffff",
    theme_color:      "#D00000",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
