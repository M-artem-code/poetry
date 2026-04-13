"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, MessageCircle, Bookmark } from "lucide-react";

interface InteractionBarProps {
  views: number;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  isFavorite: boolean;
  onToggleLike: () => void;
  onToggleFavorite: () => void;
  onToggleComments: () => void;
  isCommentsOpen: boolean;
}

function PillButton({
  icon: Icon,
  count,
  active,
  activeColor,
  activeBg,
  onClick,
  label,
  filled,
}: {
  icon: React.ElementType;
  count: number;
  active: boolean;
  activeColor: string;
  activeBg: string;
  onClick: () => void;
  label: string;
  filled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors border"
      style={{
        color: active ? activeColor : "#94a3b8",
        background: active ? activeBg : "rgba(255,255,255,0.05)",
        borderColor: active
          ? activeColor.replace(")", ",0.3)")
          : "rgba(255,255,255,0.08)",
        boxShadow: active
          ? `0 2px 8px ${activeColor.replace(")", ",0.15)")}`
          : "none",
      }}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <motion.div
        animate={active ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon
          className="w-4 h-4"
          fill={filled && active ? "currentColor" : "none"}
        />
      </motion.div>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function InteractionBar({
  views,
  likesCount,
  isLiked,
  commentsCount,
  isFavorite,
  onToggleLike,
  onToggleFavorite,
  onToggleComments,
  isCommentsOpen,
}: InteractionBarProps) {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <PillButton
        icon={Eye}
        count={views}
        active={false}
        activeColor="rgba(100,116,139,1)"
        activeBg="rgba(100,116,139,0.08)"
        onClick={() => {}}
        label="Прагляды"
      />
      <PillButton
        icon={Heart}
        count={likesCount}
        active={isLiked}
        activeColor="rgba(244,63,94,1)"
        activeBg="rgba(244,63,94,0.08)"
        onClick={onToggleLike}
        label="Лайк"
        filled
      />
      <PillButton
        icon={Bookmark}
        count={0}
        active={isFavorite}
        activeColor="rgba(245,158,11,1)"
        activeBg="rgba(245,158,11,0.08)"
        onClick={onToggleFavorite}
        label="Абранае"
        filled
      />
      <PillButton
        icon={MessageCircle}
        count={commentsCount}
        active={isCommentsOpen}
        activeColor="rgba(59,130,246,1)"
        activeBg="rgba(59,130,246,0.08)"
        onClick={onToggleComments}
        label="Каментары"
      />
    </motion.div>
  );
}
