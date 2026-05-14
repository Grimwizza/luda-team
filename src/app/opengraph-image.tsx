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
  const bgBuffer = readFileSync(join(process.cwd(), "public/hero/Nick - Action Shot - 2026.jpg"));
  const bgArrayBuffer = bgBuffer.buffer.slice(bgBuffer.byteOffset, bgBuffer.byteOffset + bgBuffer.byteLength);

  const logoBuffer = readFileSync(join(process.cwd(), "public/LUDA-logo.png"));
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
          src={bgArrayBuffer as any}
          width="1200"
          height="630"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          alt="Background"
        />
        {/* Removed dark overlay as requested */}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
          <img
            src={logoArrayBuffer as any}
            width="400"
            height="400"
            alt="LUDA Logo"
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
