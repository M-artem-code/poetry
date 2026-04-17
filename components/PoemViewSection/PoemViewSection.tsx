"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import { usePoem } from "@/src/features/poems";
import { useCreateComment, useDeleteComment } from "@/src/features/comments";
import { useOptimisticFavorite } from "@/src/shared/hooks/interactions";
import { useUserStore } from "@/src/entities/user";
import styles from "./PoemViewSection.module.css";
import { useComments } from "@/src/features/comments/model/use-comments";

interface PoemViewSectionProps {
  poemId: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Форматирование даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Сёння";
  if (days === 1) return "Учора";
  if (days < 7) return `${days} дзён таму`;
  if (days < 30) return `${Math.floor(days / 7)} тыд. таму`;
  return date.toLocaleDateString("be-BY");
};

const PoemViewSection = ({ poemId }: PoemViewSectionProps) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const poemIdNum = Number(poemId);

  // Данные пользователя
  const { user, isAuthenticated } = useUserStore();

  // Получаем стих
  const { data: poem, isLoading, error } = usePoem(poemIdNum);

  // Комментарии
  const { data: comments = [], isLoading: isLoadingComments } =
    useComments(poemIdNum);
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment(poemIdNum);

  // Избранное
  const { isFavorite, toggleFavorite, isMutating } = useOptimisticFavorite(poemIdNum);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [newComment, setNewComment] = useState("");


  const handleBackClick = () => {
    router.back();
  };

  const handleCommentsToggle = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      alert("Увайдзіце, каб дадаць у абранае");
      return;
    }
    toggleFavorite();
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!isAuthenticated) {
      alert("Увайдзіце, каб пакінуць каментарый");
      return;
    }

    try {
      await createComment.mutateAsync({ poemId: poemIdNum, text: newComment });
      setNewComment("");
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (confirm("Удалить комментарий?")) {
      try {
        await deleteComment.mutateAsync(commentId);
      } catch (err) {
        console.error("Error deleting comment:", err);
      }
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  if (isLoading) {
    return (
      <section className={styles.poemViewSection}>
        <div className={styles.noVideoBackground}></div>
        <div className={styles.videoOverlay}></div>
        <div className="container">
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              position: "relative",
              zIndex: 2,
            }}
          >
            <p>Загрузка...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !poem) {
    return (
      <section className={styles.poemViewSection}>
        <div className={styles.noVideoBackground}></div>
        <div className={styles.videoOverlay}></div>
        <div className="container">
          <button className={styles.backButton} onClick={handleBackClick}>
            ← Назад
          </button>
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              position: "relative",
              zIndex: 2,
            }}
          >
            <p>Верш не знойдзены</p>
          </div>
        </div>
      </section>
    );
  }

  // Информация об авторе
  const authorName = poem.author?.name || "Невядомы аўтар";
  const authorYears = poem.author?.birthYear
    ? `(${poem.author.birthYear}${poem.author.deathYear ? `–${poem.author.deathYear}` : ""})`
    : "";

  // Формируем URL видео
  // Если videoUrl начинается с /, это путь из public (используем напрямую)
  // Иначе это путь на бэкенде (добавляем API_URL)
  const videoUrl = poem.videoUrl
    ? poem.videoUrl.startsWith("/")
      ? poem.videoUrl
      : `${API_URL}${poem.videoUrl}`
    : null;

  return (
    <section className={styles.poemViewSection}>
      {/* Background Video */}
      {videoUrl ? (
        <>
          <video
            ref={videoRef}
            className={`${styles.videoBackground} ${!isVideoPlaying ? styles.paused : ""}`}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          {/* Video Controls */}
          <div className={styles.videoControls}>
            <button
              className={styles.videoControlButton}
              onClick={toggleVideoPlay}
              title={isVideoPlaying ? "Пауза" : "Воспроизвести"}
            >
              {isVideoPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              className={`${styles.videoControlButton} ${isVideoMuted ? styles.muted : ""}`}
              onClick={toggleVideoMute}
              title={isVideoMuted ? "Включить звук" : "Выключить звук"}
            >
              {isVideoMuted ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.noVideoBackground}></div>
      )}

      {/* Overlay */}
      <div className={styles.videoOverlay}></div>

      <div className="container">
        <button className={styles.backButton} onClick={handleBackClick}>
          ← Назад
        </button>

        <div className={styles.poemContainer}>
          <div className={styles.poemHeader}>
            <p className={styles.authorLabel}>
              {authorName} {authorYears}
            </p>
            <h1 className={styles.poemTitle}>{poem.title}</h1>
          </div>

          <div className={styles.poemContent}>
            <pre className={styles.poemText}>{poem.content}</pre>
          </div>

          <div className={styles.poemFooter}>
            {poem.year && <span className={styles.poemYear}>{poem.year}</span>}
          </div>

          {/* Описание стиха */}
          {poem.description && (
            <div className={styles.poemDescription}>
              <h3 className={styles.descriptionTitle}>Пра верш</h3>
              <p className={styles.descriptionText}>{poem.description}</p>
            </div>
          )}

          {/* Информация об авторе */}
          {poem.author?.bio && (
            <div className={styles.authorBio}>
              <h3 className={styles.bioTitle}>Пра аўтара</h3>
              <p className={styles.bioText}>
                {poem.author.bio.length > 200
                  ? `${poem.author.bio.slice(0, 200)}...`
                  : poem.author.bio}
              </p>
              {poem.author.slug && (
                <Link
                  href={`/author/${poem.author.slug}`}
                  className={styles.bioLink}
                >
                  Чытаць поўную біяграфію →
                </Link>
              )}
            </div>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.actionsButtons}>
              <button
                className={`${styles.iconButton} ${isCommentsOpen ? styles.active : ""}`}
                onClick={handleCommentsToggle}
                title="Комментарии"
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {comments.length > 0 && (
                  <span className={styles.badge}>{comments.length}</span>
                )}
              </button>

              <button
                className={`${styles.iconButton} ${isFavorite ? styles.active : ""}`}
                onClick={handleFavorite}
                title="Избранное"
                disabled={isMutating}
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>

            {isFavorite && (
              <span className={styles.statusText}>
                Верш дададзены ў абранае
              </span>
            )}
          </div>

          {/* Comments Section */}
          {isCommentsOpen && (
            <div className={styles.commentsSection}>
              <h2 className={styles.commentsTitle}>
                Каментарыі {comments.length > 0 && `(${comments.length})`}
              </h2>

              {/* Add Comment Form */}
              {isAuthenticated ? (
                <form
                  className={styles.commentForm}
                  onSubmit={handleAddComment}
                >
                  <div className={styles.commentAvatar}>
                    {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <input
                    type="text"
                    placeholder="Пакіньце свой каментарый..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={styles.commentInput}
                    disabled={createComment.isPending}
                  />
                  <button
                    type="submit"
                    className={styles.commentSubmit}
                    disabled={!newComment.trim() || createComment.isPending}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              ) : (
                <div className={styles.loginPrompt}>
                  <p>Увайдзіце, каб пакідаць каментарыі</p>
                </div>
              )}

              {/* Comments List */}
              <div className={styles.commentsList}>
                {isLoadingComments ? (
                  <p style={{ textAlign: "center", color: "#999" }}>
                    Загрузка каментарыяў...
                  </p>
                ) : comments.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#999" }}>
                    Пакуль няма каментарыяў. Будзьце першым!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                      <div className={styles.commentAvatarLarge}>
                        {(comment.user?.name || comment.user?.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div className={styles.commentContent}>
                        <div className={styles.commentHeader}>
                          <span className={styles.commentAuthor}>
                            {comment.user?.name ||
                              comment.user?.email ||
                              "Карыстальнік"}
                          </span>
                          <span className={styles.commentDate}>
                            {formatDate(comment.createdAt)}
                          </span>
                          {/* Кнопка удаления для автора */}
                          {user && comment.userId === user.id && (
                            <button
                              className={styles.deleteCommentBtn}
                              onClick={() => handleDeleteComment(comment.id)}
                              title="Выдаліць"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <p className={styles.commentText}>{comment.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PoemViewSection;
