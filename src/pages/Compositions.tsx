const compositions = [
  {
    players: 9,
    name: "スタンダード9人村",
    roles: "市民3, 人狼2, 占い師1, 霊能者1, 狩人1, 狂人1",
    notes: "最も基本的な編成。初心者におすすめ。",
  },
  {
    players: 12,
    name: "スタンダード12人村",
    roles: "市民4, 人狼3, 占い師1, 霊能者1, 狩人1, 狂人1, 妖狐1",
    notes: "第三陣営が入る中級者向け編成。妖狐の処理が鍵。",
  },
  {
    players: 15,
    name: "役職盛り15人村",
    roles: "市民3, 人狼3, 占い師1, 霊能者1, 狩人1, 狂人1, 妖狐1, 狂信者1, 猫又1, パン屋1, 市民1",
    notes: "多役職で戦略の幅が広がる上級者向け編成。",
  },
];

function Compositions() {
  return (
    <div>
      <section className="section">
        <h2>編成考察</h2>
        <p>人数別のおすすめ編成と、各編成のポイントを紹介します。</p>
      </section>

      {compositions.map((comp) => (
        <div key={comp.name} className="card">
          <h2>{comp.name}（{comp.players}人）</h2>
          <p><strong>編成：</strong>{comp.roles}</p>
          <p style={{ marginTop: "0.5rem", color: "var(--color-text-muted)" }}>{comp.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default Compositions;
