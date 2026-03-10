const roles = [
  { name: "市民", team: "市民陣営", description: "特別な能力を持たないが、議論と投票で人狼を追放する。" },
  { name: "人狼", team: "人狼陣営", description: "夜に市民を襲撃する。昼は市民のふりをして生き延びる。" },
  { name: "占い師", team: "市民陣営", description: "毎晩一人を占い、人狼かどうかを知ることができる。" },
  { name: "霊能者", team: "市民陣営", description: "処刑された人が人狼だったかどうかを知ることができる。" },
  { name: "狩人", team: "市民陣営", description: "毎晩一人を護衛し、人狼の襲撃から守ることができる。" },
  { name: "狂人", team: "人狼陣営", description: "人狼の味方だが、占い結果は市民と出る。" },
  { name: "妖狐", team: "第三陣営", description: "人狼に襲撃されても死なないが、占われると死亡する。" },
  { name: "狂信者", team: "人狼陣営", description: "人狼が誰か知っている狂人。" },
  { name: "猫又", team: "市民陣営", description: "処刑や襲撃で死亡した時、道連れにする能力を持つ。" },
  { name: "パン屋", team: "市民陣営", description: "生存中、毎朝パンが届けられる。死亡するとパンが届かなくなる。" },
];

function Roles() {
  return (
    <div>
      <section className="section">
        <h2>役職一覧</h2>
        <p>人狼ジャッジメントに登場する主要な役職を紹介します。</p>
      </section>

      <div className="role-grid">
        {roles.map((role) => (
          <div key={role.name} className="role-card">
            <h3>{role.name}</h3>
            <div className="team">{role.team}</div>
            <p>{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roles;
