"use client";

import { useState } from "react";
import { usePoem } from "../../model/use-poem";
import { useOptimisticLike } from "@/src/shared/hooks/interactions";
import { useOptimisticFavorite } from "@/src/shared/hooks/interactions";
import { usePoemInteractions } from "@/src/shared/hooks/interactions";
import { useOptimisticViews } from "@/src/shared/hooks/interactions";
import { PoemPageSkeleton } from "./poem-page-skeleton";
import { PoemHeader } from "./poem-header";
import { PoemContent } from "./poem-content";
import { InteractionBar } from "./interaction-bar";
import { PoemPageComments } from "./poem-page-comments";
import styles from "./poem-view-page.module.css";

interface PoemViewPageProps {
  poemId: number;
}

export function PoemViewPage({ poemId }: PoemViewPageProps) {
  const { data: poem, isLoading, error } = usePoem(poemId);
  const { isLiked, likeCount, toggleLike } = useOptimisticLike(poemId);
  const { isFavorite, toggleFavorite } = useOptimisticFavorite(poemId);
  const { commentsCount } = usePoemInteractions(poemId);
  const { addView } = useOptimisticViews(poemId);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [viewTracked, setViewTracked] = useState(false);

  if (isLoading) return <PoemPageSkeleton />;

  if (error || !poem) {
    return (
      <div
        className={styles.page}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <p className="text-slate-400 text-lg">Верш не знойдзены</p>
          <p className="text-slate-500 text-sm mt-2">Паспрабуйце пазней</p>
        </div>
      </div>
    );
  }

  const handleToggleComments = () => {
    setCommentsOpen((prev) => !prev);
  };

  const handleFirstInteraction = () => {
    if (!viewTracked) {
      addView();
      setViewTracked(true);
    }
  };

  return (
    <div className={styles.page} onClick={handleFirstInteraction}>
      <div className={styles.container}>
        <PoemHeader isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />

        <PoemContent poem={poem} />

        <div className="mt-8">
          <InteractionBar
            views={poem.views}
            likesCount={likeCount}
            isLiked={isLiked}
            commentsCount={commentsCount}
            isFavorite={isFavorite}
            onToggleLike={toggleLike}
            onToggleFavorite={toggleFavorite}
            onToggleComments={handleToggleComments}
            isCommentsOpen={commentsOpen}
          />
        </div>

        <PoemPageComments
          poemId={poemId}
          commentsCount={commentsCount}
          isOpen={commentsOpen}
        />
      </div>
    </div>
  );
}
