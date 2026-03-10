import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="section">
        <h2>人狼ジャッジメント ファンサイトへようこそ</h2>
        <p>
          人狼ジャッジメントの役職情報、立ち回り、初心者向け解説、編成考察をまとめたファンサイトです。
          ブラウザでもmacOSアプリでもお楽しみいただけます。
        </p>
      </section>

      <div className="role-grid">
        <Link to="/roles" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h2>役職一覧</h2>
          <p>全役職の能力と立ち回りを解説</p>
        </Link>
        <Link to="/beginner" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h2>初心者ガイド</h2>
          <p>はじめての方向けの基本ルールと攻略</p>
        </Link>
        <Link to="/compositions" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h2>編成考察</h2>
          <p>人数別のおすすめ編成と戦略</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
