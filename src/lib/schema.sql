-- =============================================
-- 人狼ジャッジメント ファンサイト データベース設計
-- SQLite3
-- =============================================

-- 陣営マスタ
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,          -- 村人陣営, 人狼陣営, 妖狐陣営, etc.
  color TEXT NOT NULL DEFAULT '#666',  -- テーマカラー (hex)
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 役職マスタ
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,            -- 占い師, 人狼, etc.
  team_id INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  ability TEXT NOT NULL DEFAULT '',      -- 能力の説明
  win_condition TEXT NOT NULL DEFAULT '',-- 勝利条件
  difficulty INTEGER NOT NULL DEFAULT 3,-- 難易度 1-5
  icon_url TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- 役職間の相性・関係
CREATE TABLE IF NOT EXISTS role_relations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_id INTEGER NOT NULL,
  related_role_id INTEGER NOT NULL,
  relation_type TEXT NOT NULL,           -- 'counter', 'synergy', 'neutral'
  description TEXT NOT NULL DEFAULT '',
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (related_role_id) REFERENCES roles(id),
  UNIQUE(role_id, related_role_id)
);

-- 構成（部屋の役職構成）
CREATE TABLE IF NOT EXISTS compositions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  player_count INTEGER NOT NULL,        -- 参加人数
  description TEXT NOT NULL DEFAULT '',
  difficulty INTEGER NOT NULL DEFAULT 3,
  is_recommended INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 構成に含まれる役職
CREATE TABLE IF NOT EXISTS composition_roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  composition_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,     -- その役職の人数
  FOREIGN KEY (composition_id) REFERENCES compositions(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 記事カテゴリ
CREATE TABLE IF NOT EXISTS article_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- 記事（攻略・初心者向け・コラム等）
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  difficulty INTEGER NOT NULL DEFAULT 1,  -- 1:初心者 2:中級 3:上級
  is_published INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES article_categories(id)
);

-- 記事タグ
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

-- 記事-タグ中間テーブル
CREATE TABLE IF NOT EXISTS article_tags (
  article_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 用語集
CREATE TABLE IF NOT EXISTS glossary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  term TEXT NOT NULL UNIQUE,
  reading TEXT NOT NULL DEFAULT '',       -- ふりがな
  definition TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general', -- general, slang, strategy
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 広告管理
CREATE TABLE IF NOT EXISTS ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,                     -- 広告名（管理用）
  slot TEXT NOT NULL UNIQUE,              -- 配置スロット: header, sidebar, in-content, footer
  ad_type TEXT NOT NULL DEFAULT 'adsense',-- adsense, affiliate, custom
  ad_code TEXT NOT NULL DEFAULT '',       -- 広告コード（HTML/JS）
  is_active INTEGER NOT NULL DEFAULT 1,
  start_date TEXT,                        -- 掲載開始日
  end_date TEXT,                          -- 掲載終了日
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 広告インプレッション・クリック追跡
CREATE TABLE IF NOT EXISTS ad_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ad_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,               -- 'impression', 'click'
  page_path TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  ip_hash TEXT NOT NULL DEFAULT '',       -- ハッシュ化されたIP
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (ad_id) REFERENCES ads(id) ON DELETE CASCADE
);

-- ページビュー追跡
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  referrer TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_roles_team ON roles(team_id);
CREATE INDEX IF NOT EXISTS idx_roles_active ON roles(is_active);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_glossary_category ON glossary(category);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_ads_slot ON ads(slot);
CREATE INDEX IF NOT EXISTS idx_ads_active ON ads(is_active);
CREATE INDEX IF NOT EXISTS idx_ad_events_ad ON ad_events(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_events_date ON ad_events(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(created_at);
