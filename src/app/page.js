import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <h2 className={styles.pageTitle}>人狼ジャッジメント ファンサイト</h2>
      <p className={styles.description}>
        人狼ジャッジメントの役職情報、立ち回り、初心者向け解説、編成考察をまとめるファンサイトです。
      </p>

      <section className={styles.linkList}>
        <a href="/yaminabe-roles" className={styles.linkCard}>
          <h3>闇鍋用非同村役一覧</h3>
          <p>闇鍋モードで同じ村に入れない役職の組み合わせをチェック</p>
        </a>
      </section>
    </div>
  );
}
