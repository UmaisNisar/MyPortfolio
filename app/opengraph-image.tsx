import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0f0e",
          color: "#e9e7e1",
          padding: 64,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 4,
            color: "#8f8d85",
          }}
        >
          <span>PORTFOLIO — 2026</span>
          <span>{site.location.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 110, lineHeight: 1.02 }}>I MAKE</span>
          <span style={{ fontSize: 110, lineHeight: 1.02 }}>THE WEB</span>
          <span style={{ fontSize: 110, lineHeight: 1.02, display: "flex" }}>
            MOVE<span style={{ color: "#bf5fff" }}>.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 3,
          }}
        >
          <span>{site.name.toUpperCase()}</span>
          <span style={{ color: "#bf5fff" }}>{site.role.toUpperCase()}</span>
        </div>
      </div>
    ),
    size,
  );
}
