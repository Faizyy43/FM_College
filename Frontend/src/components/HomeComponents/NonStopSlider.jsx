import React, { useState, useMemo } from "react";

// LogoMarquee.jsx
// Tailwind-based, single-file React component that shows a nonstop horizontal marquee
// - Automatically scrolls left-to-right (or right-to-left) forever
// - Pauses when hovered
// - "duplicates" prop controls how many times the logo set is repeated to ensure smooth looping
// Usage:
// 1. Put your logo images in /public/logos/ (or import them and replace the `logos` array)
// 2. <LogoMarquee logos={logos} speed={30} duplicates={10} />

export default function NonStopSlider({
  logos = [
    // Example: If you place images in public/logos/, reference them like below
    "/logos/financial-express.png",
    "/logos/inc42.png",
    "/logos/apn.png",
    "/logos/yourstory.png",
    "/logos/economic-times.png",
  ],
  // speed = how many pixels per second the track moves (higher = faster)
  speed = 30,
  // how many times to repeat the logos array to create a long continuous strip
  duplicates = 10,
  // height of each logo card (Tailwind spacing: h-24 ~ 6rem). You can pass any Tailwind-compatible class
  cardHeightClass = "h-20",
}) {
  const [paused, setPaused] = useState(false);

  // build a long array by repeating original logos
  const items = useMemo(() => {
    const out = [];
    for (let i = 0; i < duplicates; i++) {
      for (let j = 0; j < logos.length; j++) out.push({ src: logos[j], key: `${i}-${j}` });
    }
    return out;
  }, [logos, duplicates]);

  // estimate the width of the entire strip in pixels for animation duration
  // For a robust approach you'd measure DOM nodes; here we approximate by card width.
  // We assume each card ~ 240px width (adjust if yours are wider). You can tweak this constant.
  const approxCardWidthPx = 240;
  const totalWidthPx = items.length * approxCardWidthPx;
  // animation duration in seconds to move totalWidthPx at `speed` px/sec
  const durationSeconds = Math.max(10, totalWidthPx / speed);

  return (
    <div
      className="w-full bg-gray-50 py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* viewport */}
        <div className="overflow-hidden whitespace-nowrap">
          {/* animated track */}
          <div
            className="inline-flex items-center gap-6"
            style={{
              animationName: "marquee-scroll",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDuration: `${durationSeconds}s`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {items.map((it, idx) => (
              <div
                key={it.key + idx}
                className={`shrink-0 ${cardHeightClass} w-60 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center p-4`}
              >
                {/* logo image */}
                <img
                  src={it.src}
                  alt={`logo-${idx}`}
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline keyframes - kept inside component to make this single-file */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* We used translateX(-50%) so the track should be at least twice the visible width.
           Because we repeated the logos many times (duplicates prop), this creates
           a smooth-looking loop. If you see jumps, increase duplicates or decrease approxCardWidthPx.
        */
      `}</style>
    </div>
  );
}
