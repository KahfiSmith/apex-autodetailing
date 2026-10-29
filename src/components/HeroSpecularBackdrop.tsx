"use client";

import dynamic from "next/dynamic";

const HeroSpecularCanvas = dynamic(
  () => import("@/components/HeroSpecularCanvas"),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(62% 48% at 72% 28%, rgba(197, 168, 128, 0.09) 0%, rgba(11, 12, 14, 0) 74%)",
        }}
      />
    ),
  }
);

export default function HeroSpecularBackdrop() {
  return <HeroSpecularCanvas />;
}
