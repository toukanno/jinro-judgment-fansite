const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const DB_PATH = path.join(DATA_DIR, "jinro.db");
const SCHEMA_PATH = path.join(__dirname, "..", "src", "lib", "schema.sql");

// データディレクトリ作成
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 既存DB削除して再作成
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// スキーマ実行
const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
db.exec(schema);

// シードデータ投入
// 陣営
const insertTeam = db.prepare("INSERT INTO teams (name, color, sort_order) VALUES (?, ?, ?)");
const teams = [
  ["村人陣営", "#4A90D9", 1],
  ["人狼陣営", "#D94A4A", 2],
  ["妖狐陣営", "#D9A04A", 3],
  ["恋人陣営", "#D94A9A", 4],
  ["その他", "#888888", 5],
];
teams.forEach(t => insertTeam.run(...t));

// 役職
const insertRole = db.prepare(`
  INSERT INTO roles (name, team_id, description, ability, win_condition, difficulty, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);
const roles = [
  ["市民", 1, "特別な能力を持たない一般の村人。", "なし", "人狼を全員追放する", 1, 1],
  ["占い師", 1, "毎晩一人を占い、人狼かどうかを調べることができる。", "夜に一人を占い、人狼か人狼でないかを知る", "人狼を全員追放する", 3, 2],
  ["霊媒師", 1, "処刑された人が人狼だったかを知ることができる。", "処刑された人が人狼かどうかを知る", "人狼を全員追放する", 2, 3],
  ["狩人", 1, "毎晩一人を人狼の襲撃から守ることができる。", "夜に一人を護衛し、人狼の襲撃から守る", "人狼を全員追放する", 3, 4],
  ["騎士", 1, "狩人の上位互換。連続ガードが可能。", "夜に一人を護衛（連続ガード可能）", "人狼を全員追放する", 3, 5],
  ["双子", 1, "ゲーム開始時にお互いを確認できる。", "もう一人の双子が誰か知っている", "人狼を全員追放する", 2, 6],
  ["猫又", 1, "処刑・襲撃されると道連れにする。", "死亡時にランダムで一人を道連れにする", "人狼を全員追放する", 3, 7],
  ["パン屋", 1, "生存していると毎朝パンが届く。", "生存確認の役割を持つ", "人狼を全員追放する", 1, 8],
  ["罠師", 1, "罠を仕掛けて人狼を返り討ちにできる。", "夜に罠を仕掛け、襲撃してきた人狼を殺す", "人狼を全員追放する", 4, 9],
  ["人狼", 2, "村人に紛れて村を滅ぼそうとする。", "夜に一人を襲撃して殺す。仲間の人狼を知っている", "生存者の半数以上を人狼にする", 3, 10],
  ["狂人", 2, "人狼の味方をする人間。", "特になし。占い結果は人間と出る", "人狼陣営の勝利", 3, 11],
  ["狂信者", 2, "人狼が誰かを知っている狂人。", "人狼が誰か知っている。占い結果は人間", "人狼陣営の勝利", 2, 12],
  ["ささやく狂人", 2, "人狼と夜に会話できる狂人。", "人狼チャットに参加できる", "人狼陣営の勝利", 3, 13],
  ["妖狐", 3, "人狼に襲撃されても死なないが、占われると死ぬ。", "人狼の襲撃で死なない。占われると死ぬ（呪殺）", "ゲーム終了時に生存している", 5, 14],
  ["背徳者", 3, "妖狐の味方をする人間。", "妖狐が誰か知っている。妖狐が死ぬと後追い死する", "妖狐陣営の勝利", 3, 15],
  ["恋人", 4, "相手が死ぬと自分も死ぬ。", "恋人同士はお互いを知っている。片方が死ぬと後追い", "ゲーム終了時に恋人が二人とも生存", 4, 16],
  ["独裁者", 1, "一度だけ即時処刑を行える。", "昼の議論中に一度だけ、対象を即処刑できる", "人狼を全員追放する", 4, 17],
  ["魔女", 1, "蘇生と毒殺を一度ずつ使える。", "蘇生の薬と毒殺の薬を各1回使用可能", "人狼を全員追放する", 4, 18],
  ["賢者", 1, "占い師の上位互換。役職まで分かる。", "夜に一人を占い、具体的な役職を知る", "人狼を全員追放する", 4, 19],
  ["怪盗", 5, "他プレイヤーと役職を交換できる。", "初日の夜に他プレイヤーと役職を交換できる", "交換後の役職の勝利条件に従う", 4, 20],
];
roles.forEach(r => insertRole.run(...r));

// 記事カテゴリ
const insertCat = db.prepare("INSERT INTO article_categories (name, slug, description, sort_order) VALUES (?, ?, ?, ?)");
const categories = [
  ["初心者ガイド", "beginners", "人狼ジャッジメントを始めたばかりの方向け", 1],
  ["攻略・戦略", "strategies", "中級者〜上級者向けの戦略記事", 2],
  ["コラム", "columns", "人狼ジャッジメントに関するコラム", 3],
];
categories.forEach(c => insertCat.run(...c));

// 初心者向け記事
const insertArticle = db.prepare(`
  INSERT INTO articles (category_id, title, slug, summary, content, difficulty, is_published)
  VALUES (?, ?, ?, ?, ?, ?, 1)
`);
const articles = [
  [1, "人狼ジャッジメントの始め方", "how-to-start", "ゲームのダウンロードから最初の一戦まで", "人狼ジャッジメントを始めるための基本的な手順を解説します。", 1],
  [1, "基本ルールを覚えよう", "basic-rules", "昼フェーズと夜フェーズの流れ", "人狼ゲームの基本的なルールと流れを説明します。", 1],
  [1, "初心者におすすめの役職", "recommended-roles", "最初に使うべき役職とその立ち回り", "初心者が最初に覚えるべき役職を紹介します。", 1],
  [1, "COとは？基本用語解説", "basic-terms", "人狼ジャッジメントで使われる基本用語", "CO、ローラー、グレーなど基本的な用語を解説します。", 1],
  [2, "占い師の基本戦略", "fortune-teller-strategy", "占い師で勝つための基本的な立ち回り", "占い師として効果的にプレイするための戦略を解説します。", 2],
  [2, "人狼の立ち回りガイド", "werewolf-strategy", "人狼で勝つための騙り方と潜伏のコツ", "人狼としてのプレイスタイルと戦略を紹介します。", 2],
  [2, "狩人の護衛先の考え方", "hunter-guard-strategy", "効果的な護衛先の選び方", "狩人として最適な護衛先を選ぶ考え方を解説します。", 2],
  [2, "ログの読み方と考察力", "log-reading", "発言ログから情報を読み取るコツ", "ログを分析して人狼を見つけるテクニックを紹介します。", 3],
];
articles.forEach(a => insertArticle.run(...a));

// 構成
const insertComp = db.prepare(`
  INSERT INTO compositions (name, player_count, description, difficulty, is_recommended)
  VALUES (?, ?, ?, ?, ?)
`);
const compositions = [
  ["スタンダード9人村", 9, "最も基本的な9人構成。初心者向け。", 1, 1],
  ["12人村（狐あり）", 12, "妖狐が入った12人構成。中級者向け。", 3, 1],
  ["15人村（フル構成）", 15, "多数の役職が入った大人数構成。", 4, 0],
];
compositions.forEach(c => insertComp.run(...c));

// 構成の役職
const insertCompRole = db.prepare("INSERT INTO composition_roles (composition_id, role_id, count) VALUES (?, ?, ?)");
// 9人村: 市民3, 占い1, 霊媒1, 狩人1, 人狼2, 狂人1
[[1,1,3],[1,2,1],[1,3,1],[1,4,1],[1,10,2],[1,11,1]].forEach(r => insertCompRole.run(...r));
// 12人村: 市民4, 占い1, 霊媒1, 狩人1, 人狼3, 狂人1, 妖狐1
[[2,1,4],[2,2,1],[2,3,1],[2,4,1],[2,10,3],[2,11,1],[2,14,1]].forEach(r => insertCompRole.run(...r));

// 用語集
const insertGlossary = db.prepare("INSERT INTO glossary (term, reading, definition, category) VALUES (?, ?, ?, ?)");
const glossaryItems = [
  ["CO", "しーおー", "カミングアウトの略。自分の役職を公開すること。", "general"],
  ["ローラー", "ろーらー", "同じ役職をCOした人を順番に全員処刑すること。", "strategy"],
  ["グレー", "ぐれー", "占い師に白とも黒とも判定されていない人。", "general"],
  ["ライン", "らいん", "プレイヤー間の関係性や繋がりのこと。", "strategy"],
  ["SG", "えすじー", "スケープゴート。人狼が最終日に吊らせる村人。", "strategy"],
  ["PP", "ぴーぴー", "パワープレイ。人狼陣営が過半数を占めた時の強制勝利。", "general"],
  ["GJ", "ぐっじょぶ", "グッジョブ。狩人が人狼の襲撃を防いだこと。", "general"],
  ["確白", "かくしろ", "確定で村人陣営だと判明している人。", "general"],
  ["対抗", "たいこう", "同じ役職をCOすること。", "general"],
  ["潜伏", "せんぷく", "役職をCOせずに市民のふりをすること。", "strategy"],
];
glossaryItems.forEach(g => insertGlossary.run(...g));

// FAQ
const insertFaq = db.prepare("INSERT INTO faqs (question, answer, category, sort_order) VALUES (?, ?, ?, ?)");
const faqItems = [
  ["人狼ジャッジメントは無料ですか？", "基本プレイは無料です。一部アイテムやスキンに課金要素があります。", "general", 1],
  ["初心者が最初にやるべきことは？", "まず9人村の市民でプレイして、ゲームの流れを覚えることをおすすめします。", "beginner", 2],
  ["荒らしに遭遇したらどうすればいい？", "通報機能を使って運営に報告しましょう。反応せずにゲームを続けることが大切です。", "general", 3],
  ["役職が多すぎて覚えられません", "最初は市民、占い師、人狼の3つだけ覚えれば大丈夫です。慣れてから他の役職に挑戦しましょう。", "beginner", 4],
  ["勝率を上げるにはどうすれば？", "ログを読む練習をし、論理的に考察する力を身につけましょう。攻略記事も参考にしてください。", "strategy", 5],
];
faqItems.forEach(f => insertFaq.run(...f));

// 広告スロット
const insertAd = db.prepare("INSERT INTO ads (name, slot, ad_type, ad_code, is_active) VALUES (?, ?, ?, ?, 1)");
const adSlots = [
  ["ヘッダーバナー", "header", "adsense", "<!-- AdSense Header -->", ],
  ["サイドバー上部", "sidebar-top", "adsense", "<!-- AdSense Sidebar Top -->"],
  ["サイドバー下部", "sidebar-bottom", "adsense", "<!-- AdSense Sidebar Bottom -->"],
  ["記事中広告", "in-content", "adsense", "<!-- AdSense In-Content -->"],
  ["フッター広告", "footer", "adsense", "<!-- AdSense Footer -->"],
  ["記事下レクタングル", "after-content", "adsense", "<!-- AdSense After Content -->"],
];
adSlots.forEach(a => insertAd.run(...a));

// タグ
const insertTag = db.prepare("INSERT INTO tags (name, slug) VALUES (?, ?)");
const tagItems = [
  ["初心者", "beginner"], ["占い師", "fortune-teller"], ["人狼", "werewolf"],
  ["狩人", "hunter"], ["戦略", "strategy"], ["用語", "terms"],
  ["構成", "composition"], ["考察", "analysis"],
];
tagItems.forEach(t => insertTag.run(...t));

db.close();
console.log("Database initialized successfully at:", DB_PATH);
