"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User, Quote } from "lucide-react";
import type { Poem } from "@/src/shared/types";

interface PoemContentProps {
  poem: Poem;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return "толькі што";
  if (diffMinutes < 60) return `${diffMinutes} хв таму`;
  if (diffHours < 24) return `${diffHours} гадзін таму`;
  if (diffDays < 7) return `${diffDays} дзён таму`;
  return date.toLocaleDateString("be-BY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function PoemContent({ poem }: PoemContentProps) {
  return (
    <div className="space-y-8">
      {/* Author + time */}
      <motion.div
        className="flex items-center gap-4"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
      >
        {poem.author.image ? (
          <Image
            src={poem.author.image}
            alt={poem.author.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/30 shadow-md"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ring-2 ring-white/10 shadow-md">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        )}
        <div>
          <p className="font-semibold text-white text-[15px]">
            {poem.author.name}
          </p>
          <p className="text-sm text-slate-400">
            {poem.author.birthYear &&
              `${poem.author.birthYear}${poem.author.deathYear ? ` – ${poem.author.deathYear}` : ""}`}
            {poem.author.birthYear && " · "}
            {formatRelativeTime(poem.createdAt)}
          </p>
        </div>
      </motion.div>

      {/* Title */}
      {poem.title && (
        <motion.h1
          className="text-3xl font-serif font-bold text-white leading-tight"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {poem.title}
        </motion.h1>
      )}

      {/* Categories */}
      {poem.categories.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {poem.categories.map((category) => (
            <span
              key={category.id}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-amber-400 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 transition-colors cursor-pointer"
            >
              #{category.name}
            </span>
          ))}
        </motion.div>
      )}

      {/* Poem text card */}
      <motion.div
        className="bg-white/5 rounded-2xl p-8 border border-white/10 relative overflow-hidden backdrop-blur-sm"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Decorative quote */}
        <Quote className="absolute -top-2 -right-2 w-20 h-20 text-white/5 pointer-events-none rotate-12" />

        {/* Description */}
        {poem.description && (
          <p className="text-slate-300 text-sm italic leading-relaxed mb-6 pl-4 border-l-2 border-amber-500/40 bg-amber-500/5 py-2 rounded-r-lg">
            {poem.description}
          </p>
        )}

        {/* Poem body */}
        <div className="relative pl-6">
          <div
            className="absolute left-0 top-0 bottom-0 w-0.75 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #fbbf24, #f97316, #fbbf24)",
            }}
          />
          <p className="font-serif text-[17px] leading-loose text-slate-200 whitespace-pre-line">
            {poem.content}
          </p>
        </div>

        {/* Year */}
        {poem.year && (
          <p className="mt-6 text-right text-sm text-slate-500 italic">
            {poem.year} год
          </p>
        )}
      </motion.div>
    </div>
  );
}
