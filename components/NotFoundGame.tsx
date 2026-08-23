"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/** 404 consolation prize: catch the dot, rack up a score. */
export default function NotFoundGame() {
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const flee = useCallback(() => {
    setPos({ x: 8 + Math.random() * 84, y: 12 + Math.random() * 76 });
  }, []);

  // The dot doesn't wait around.
  useEffect(() => {
    const id = setInterval(flee, 1800);
    return () => clearInterval(id);
  }, [flee]);

  const caught = () => {
    setScore((s) => s + 1);
    flee();
  };

  return (
    <div className="relative mt-14 h-[38vh] min-h-64 w-full max-w-3xl overflow-hidden border border-line">
      <p className="u-label absolute left-4 top-4 text-muted-dark">
        MEANWHILE — CATCH THE DOT
      </p>
      <p className="u-label absolute right-4 top-4 text-muted">
        SCORE <span className="text-accent">{String(score).padStart(3, "0")}</span>
      </p>

      <motion.button
        onClick={caught}
        aria-label="Catch the dot"
        className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        whileTap={{ scale: 2.2, opacity: 0 }}
      />

      {score >= 10 && (
        <p className="u-label absolute bottom-4 left-4 text-accent">
          OK, YOU&apos;VE EARNED THE HOMEPAGE →
        </p>
      )}
    </div>
  );
}
