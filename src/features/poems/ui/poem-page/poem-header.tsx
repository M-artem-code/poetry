"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

interface PoemHeaderProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function PoemHeader({ isFavorite, onToggleFavorite }: PoemHeaderProps) {
  const router = useRouter();

  return (
    <motion.div
      className="sticky top-0 z-40 -mx-6 -mt-12 mb-8 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "rgba(12, 18, 34, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: "800px" }}
      >
        {/* Back button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-sm font-medium">Назад</span>
        </motion.button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <motion.button
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Падзяліцца"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>

          <motion.button
            onClick={onToggleFavorite}
            className="p-2.5 rounded-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Абранае"
            style={{
              color: isFavorite ? "#f59e0b" : "#64748b",
              background: isFavorite
                ? "rgba(245, 158, 11, 0.1)"
                : "transparent",
            }}
          >
            <Bookmark
              className="w-4 h-4 transition-all"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
