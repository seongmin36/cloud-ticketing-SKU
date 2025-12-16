import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Turbopack 설정 (Next.js 16+ 기본값)
  turbopack: {
    rules: {
      // SVG를 React 컴포넌트로 import
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  output: "standalone",
};

export default nextConfig;
