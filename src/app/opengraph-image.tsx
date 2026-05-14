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
  const iconData = readFileSync(join(process.cwd(), "public/icon-512.png"));
  const base64Icon = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111", // Dark background matching site theme
          color: "#ffffff",
        }}
      >
        <img
          src={base64Icon}
          width="320"
          height="320"
          alt="LUDA Logo"
          style={{ marginBottom: 50 }}
        />
        <div style={{ fontSize: 56, fontWeight: 900, display: "flex", letterSpacing: "-1px" }}>
          LAKEVILLE ULTIMATE DISC ASSOCIATION
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#CC0000", marginTop: 20, display: "flex" }}>
          THE CRAYONS • HIGH SCHOOL ULTIMATE
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
