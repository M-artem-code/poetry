"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Comments } from "@/src/features/comments";

interface PoemPageCommentsProps {
  poemId: number;
  commentsCount: number;
  isOpen: boolean;
}

export function PoemPageComments({
  poemId,
  commentsCount,
  isOpen,
}: PoemPageCommentsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <div className="mt-8">
            {/* Section header */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Каментарыі</h3>
              {commentsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {commentsCount}
                </span>
              )}
            </motion.div>

            {/* Comments list */}
            <motion.div
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Comments poemId={poemId} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
