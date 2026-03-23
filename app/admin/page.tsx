"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/entities/user";
import { adminApi } from "@/src/shared/api";
import type {
  AdminStats,
  AdminUser,
  CreatePoemDto,
} from "@/src/shared/types/admin.types";
import type { Poem, Author } from "@/src/shared/types/poem.types";
import type { Category } from "@/src/shared/types/category.types";
import styles from "./admin.module.css";

type Tab = "dashboard" | "poems" | "users";

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Poem form state
  const [showPoemForm, setShowPoemForm] = useState(false);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [poemForm, setPoemForm] = useState<CreatePoemDto>({
    title: "",
    content: "",
    description: "",
    authorId: 0,
    year: undefined,
    categoryId: 0,
    videoUrl: "",
  });
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  useEffect(() => {
    // Просто загружаем данные - бекенд сам проверит права
    // Если нет прав, API вернёт ошибку
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    loadData();
  }, [isAuthenticated, router]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Загружаем статистику - если нет прав, получим ошибку
      const statsData = await adminApi.getStats();
      setStats(statsData);

      const [poemsData, categoriesData, authorsData] = await Promise.all([
        adminApi.getPoems(),
        adminApi.getCategories(),
        adminApi.getAuthors(),
      ]);
      setPoems(poemsData);
      setCategories(categoriesData);
      setAuthors(authorsData);

      // Пробуем загрузить пользователей (только для SUPER_ADMIN)
      try {
        const usersData = await adminApi.getUsers();
        setUsers(usersData);
      } catch {
        // Не супер-админ - это ок
      }
    } catch (err: any) {
      // Если 403 - нет прав
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError("У вас нет прав для доступа к админ-панели");
      } else {
        setError(err.message || "Ошибка загрузки данных");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingVideo(true);
      const result = await adminApi.uploadVideo(file);
      setPoemForm((prev) => ({ ...prev, videoUrl: result.videoUrl }));
    } catch (err: any) {
      alert("Ошибка загрузки видео: " + err.message);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleCreatePoem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !poemForm.title ||
      !poemForm.content ||
      !poemForm.authorId ||
      !poemForm.categoryId
    ) {
      alert("Заполните все обязательные поля");
      return;
    }

    try {
      if (editingPoem) {
        await adminApi.updatePoem(editingPoem.id, poemForm);
      } else {
        await adminApi.createPoem(poemForm);
      }
      setShowPoemForm(false);
      setEditingPoem(null);
      setPoemForm({
        title: "",
        content: "",
        description: "",
        authorId: 0,
        year: undefined,
        categoryId: 0,
        videoUrl: "",
      });
      loadData();
    } catch (err: any) {
      alert("Ошибка: " + err.message);
    }
  };

  const handleEditPoem = (poem: Poem) => {
    setEditingPoem(poem);
    setPoemForm({
      title: poem.title,
      content: poem.content,
      description: poem.description || "",
      authorId: poem.authorId,
      year: poem.year || undefined,
      categoryId: poem.categoryId,
      videoUrl: poem.videoUrl || "",
    });
    setShowPoemForm(true);
  };

  const handleDeletePoem = async (id: number) => {
    if (!confirm("Удалить стихотворение?")) return;
    try {
      await adminApi.deletePoem(id);
      loadData();
    } catch (err: any) {
      alert("Ошибка удаления: " + err.message);
    }
  };

  const handleSetRole = async (userId: number, role: "USER" | "ADMIN") => {
    try {
      await adminApi.setUserRole(userId, role);
      loadData();
    } catch (err: any) {
      alert("Ошибка: " + err.message);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Удалить пользователя?")) return;
    try {
      await adminApi.deleteUser(userId);
      loadData();
    } catch (err: any) {
      alert("Ошибка: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button
            onClick={() => router.push("/")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Админ-панель</h1>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.name || user?.email}</span>
          <span className={styles.userRole}>
            {user?.role === "SUPER_ADMIN" ? "Суперадмин" : "Админ"}
          </span>
        </div>
      </header>

      <nav className={styles.nav}>
        <button
          className={`${styles.navBtn} ${activeTab === "dashboard" ? styles.active : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Статистика
        </button>
        <button
          className={`${styles.navBtn} ${activeTab === "poems" ? styles.active : ""}`}
          onClick={() => setActiveTab("poems")}
        >
          📝 Стихи
        </button>
        {users.length > 0 && (
          <button
            className={`${styles.navBtn} ${activeTab === "users" ? styles.active : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Пользователи
          </button>
        )}
        <button className={styles.backBtn} onClick={() => router.push("/")}>
          ← На сайт
        </button>
      </nav>

      <main className={styles.main}>
        {/* Dashboard */}
        {activeTab === "dashboard" && stats && (
          <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>📝</span>
                <span className={styles.statValue}>{stats.poems}</span>
                <span className={styles.statLabel}>Стихов</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>👥</span>
                <span className={styles.statValue}>{stats.users}</span>
                <span className={styles.statLabel}>Пользователей</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>👑</span>
                <span className={styles.statValue}>{stats.admins}</span>
                <span className={styles.statLabel}>Админов</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>💬</span>
                <span className={styles.statValue}>{stats.comments}</span>
                <span className={styles.statLabel}>Комментариев</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>📁</span>
                <span className={styles.statValue}>{stats.categories}</span>
                <span className={styles.statLabel}>Категорий</span>
              </div>
            </div>
          </div>
        )}

        {/* Poems Management */}
        {activeTab === "poems" && (
          <div className={styles.poemsSection}>
            <div className={styles.sectionHeader}>
              <h2>Управление стихами</h2>
              <button
                className={styles.addBtn}
                onClick={() => {
                  setEditingPoem(null);
                  setPoemForm({
                    title: "",
                    content: "",
                    description: "",
                    authorId: 0,
                    year: undefined,
                    categoryId: 0,
                    videoUrl: "",
                  });
                  setShowPoemForm(true);
                }}
              >
                + Добавить стих
              </button>
            </div>

            {showPoemForm && (
              <form className={styles.poemForm} onSubmit={handleCreatePoem}>
                <h3>{editingPoem ? "Редактировать стих" : "Новый стих"}</h3>

                <div className={styles.formGroup}>
                  <label>Название *</label>
                  <input
                    type="text"
                    value={poemForm.title}
                    onChange={(e) =>
                      setPoemForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Автор *</label>
                  <select
                    value={poemForm.authorId}
                    onChange={(e) =>
                      setPoemForm((prev) => ({
                        ...prev,
                        authorId: parseInt(e.target.value),
                      }))
                    }
                    required
                  >
                    <option value={0}>Выберите автора</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Описание стихотворения</label>
                  <textarea
                    value={poemForm.description || ""}
                    onChange={(e) =>
                      setPoemForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Краткое описание или анализ стихотворения"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Год</label>
                  <input
                    type="number"
                    value={poemForm.year || ""}
                    onChange={(e) =>
                      setPoemForm((prev) => ({
                        ...prev,
                        year: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      }))
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Категория (направление) *</label>
                  <select
                    value={poemForm.categoryId}
                    onChange={(e) =>
                      setPoemForm((prev) => ({
                        ...prev,
                        categoryId: parseInt(e.target.value),
                      }))
                    }
                    required
                  >
                    <option value={0}>Выберите категорию</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Текст стихотворения *</label>
                  <textarea
                    value={poemForm.content}
                    onChange={(e) =>
                      setPoemForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={10}
                    placeholder="Вводите текст, переносы строк сохраняются автоматически"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Видео для фона</label>
                  <div className={styles.videoUpload}>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={uploadingVideo}
                    />
                    {uploadingVideo && <span>Загрузка...</span>}
                    {poemForm.videoUrl && (
                      <span className={styles.videoPath}>
                        {poemForm.videoUrl}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitBtn}>
                    {editingPoem ? "Сохранить" : "Создать"}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      setShowPoemForm(false);
                      setEditingPoem(null);
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            )}

            <div className={styles.poemsList}>
              {poems.map((poem) => (
                <div key={poem.id} className={styles.poemItem}>
                  <div className={styles.poemInfo}>
                    <h4>{poem.title}</h4>
                    <p>
                      {poem.author?.name || "Неизвестный автор"}{" "}
                      {poem.year && `(${poem.year})`}
                    </p>
                    <span className={styles.poemCategory}>
                      {poem.category?.name}
                    </span>
                    {poem.videoUrl && (
                      <span className={styles.hasVideo}>🎬 Видео</span>
                    )}
                  </div>
                  <div className={styles.poemActions}>
                    <button onClick={() => handleEditPoem(poem)}>✏️</button>
                    <button onClick={() => handleDeletePoem(poem.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Management (Super Admin only) */}
        {activeTab === "users" && users.length > 0 && (
          <div className={styles.usersSection}>
            <h2>Управление пользователями</h2>
            <div className={styles.usersList}>
              {users.map((u) => (
                <div key={u.id} className={styles.userItem}>
                  <div className={styles.userItemInfo}>
                    <span className={styles.userItemName}>
                      {u.name || "Без имени"}
                    </span>
                    <span className={styles.userItemEmail}>{u.email}</span>
                    <span
                      className={`${styles.userItemRole} ${styles[u.role.toLowerCase()]}`}
                    >
                      {u.role === "SUPER_ADMIN"
                        ? "👑 Суперадмин"
                        : u.role === "ADMIN"
                          ? "⭐ Админ"
                          : "Пользователь"}
                    </span>
                  </div>
                  <div className={styles.userItemStats}>
                    <span>💬 {u._count.comments}</span>
                    <span>❤️ {u._count.favorites}</span>
                  </div>
                  {u.role !== "SUPER_ADMIN" && u.email !== user?.email && (
                    <div className={styles.userItemActions}>
                      {u.role === "USER" ? (
                        <button onClick={() => handleSetRole(u.id, "ADMIN")}>
                          Сделать админом
                        </button>
                      ) : (
                        <button onClick={() => handleSetRole(u.id, "USER")}>
                          Убрать права
                        </button>
                      )}
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
