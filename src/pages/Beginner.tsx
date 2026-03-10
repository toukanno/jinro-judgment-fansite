function Beginner() {
  return (
    <div>
      <section className="section">
        <h2>初心者ガイド</h2>
        <p>人狼ジャッジメントをこれから始める方向けの基本ガイドです。</p>
      </section>

      <div className="card">
        <h2>基本ルール</h2>
        <p>
          人狼ゲームは「市民陣営」と「人狼陣営」に分かれて戦うゲームです。
          昼のターンでは議論と投票で怪しい人を処刑し、
          夜のターンでは人狼が市民を襲撃します。
        </p>
      </div>

      <div className="card">
        <h2>ゲームの流れ</h2>
        <ol style={{ paddingLeft: "1.5rem" }}>
          <li>役職が配られる</li>
          <li>昼：プレイヤー同士で議論する</li>
          <li>昼：投票で一人を処刑する</li>
          <li>夜：人狼が襲撃先を選ぶ</li>
          <li>夜：能力者が能力を使用する</li>
          <li>勝利条件を満たすまで繰り返す</li>
        </ol>
      </div>

      <div className="card">
        <h2>勝利条件</h2>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li><strong>市民陣営：</strong>人狼を全員処刑すれば勝利</li>
          <li><strong>人狼陣営：</strong>市民の数が人狼以下になれば勝利</li>
          <li><strong>第三陣営：</strong>役職ごとに固有の勝利条件がある</li>
        </ul>
      </div>

      <div className="card">
        <h2>初心者向けアドバイス</h2>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>まずは市民で参加して、ゲームの流れを覚えよう</li>
          <li>発言しないと怪しまれるので、積極的に議論に参加しよう</li>
          <li>他の人の発言をよく観察して、矛盾を見つけよう</li>
          <li>役職を騙る（CO）タイミングを覚えよう</li>
        </ul>
      </div>
    </div>
  );
}

export default Beginner;
