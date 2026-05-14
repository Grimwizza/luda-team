import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "The Crayons | LUDA Ultimate Frisbee";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const bgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,g_auto:subject,w_1200,h_630/Nick_-_Action_Shot_-_2026_vtactt`;
  
  // Fetch background image
  const bgBuffer = await fetch(bgUrl).then((res) => res.arrayBuffer());

  // Read logo
  const logoBuffer = readFileSync(join(process.cwd(), "public/icon-512.png"));
  const logoArrayBuffer = logoBuffer.buffer.slice(logoBuffer.byteOffset, logoBuffer.byteOffset + logoBuffer.byteLength);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={bgBuffer as any}
          width="1200"
          height="630"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          alt="Background"
        />
        {/* Dark overlay for contrast */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.65)", display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
          <img
            src={logoArrayBuffer as any}
            width="240"
            height="240"
            alt="LUDA Logo"
            style={{ marginBottom: 30 }}
          />
          <div style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", display: "flex", letterSpacing: "-1px" }}>
            LAKEVILLE ULTIMATE
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#CC0000", marginTop: 15, display: "flex" }}>
            THE CRAYONS • HIGH SCHOOL ULTIMATE
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
