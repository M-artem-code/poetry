"use client";

import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./empty-state.module.css";

export function EmptyState() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIconWrapper}>
        <BookOpen className={styles.emptyIcon} />
      </div>
      <p className={styles.emptyTitle}>Вершаў для гэтага свята яшчэ няма</p>
      <p className={styles.emptySubtitle}>Няма верша</p>
      <Button className={styles.emptyButton} disabled>
        <Sparkles className={styles.emptyButtonIcon} />
        Няма верша
      </Button>
    </div>
  );
}
