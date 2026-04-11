"use client";

import Image from "next/image";
import { User } from "lucide-react";
import type { Comment } from "@/src/shared/types";
import styles from "./CommentCard.module.css";
import { Button } from "@/components/ui/button";

interface CommentCardProps {
  comment: Comment;
  onReply?: (comment: Comment) => void;
  replies?: Comment[];
  showReplies?: boolean;
  onToggleReplies?: () => void;
}

export function CommentCard({
  comment,
  onReply,
  replies = [],
  showReplies = false,
  onToggleReplies,
}: CommentCardProps) {
  const hasReplies = replies.length > 0;

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          {comment.user?.avatar ? (
            <Image
              src={comment.user.avatar}
              alt={comment.user.name || ""}
              width={32}
              height={32}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <User />
            </div>
          )}
          <div className={styles.userInfo}>
            <div className={styles.userNameRow}>
              <span className={styles.userName}>
                {comment.user?.name || "Anonim"}
              </span>
              {onReply && (
                <Button
                  onClick={() => onReply(comment)}
                  className={styles.replyBtn}
                >
                  Ответить
                </Button>
              )}
            </div>
            <span className={styles.time}>
              {new Date(comment.createdAt).toLocaleDateString("be-BY", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>

        {/* Пометка "ответ на @username" */}
        {comment.parent && (
          <div className={styles.replyTo}>
            ответ @{comment.parent.user?.name}
          </div>
        )}

        <p className={styles.text}>{comment.text}</p>

        {hasReplies && onToggleReplies && (
          <div className={styles.actions}>
            <button onClick={onToggleReplies} className={styles.showRepliesBtn}>
              {showReplies ? "Скрыть" : `${replies.length} ответов`}
            </button>
          </div>
        )}
      </div>

      {/* Вложенные ответы */}
      {showReplies && hasReplies && (
        <div className={styles.replies}>
          {replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}
