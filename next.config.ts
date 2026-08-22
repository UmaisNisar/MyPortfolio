import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project posters are local, hand-authored SVGs.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
