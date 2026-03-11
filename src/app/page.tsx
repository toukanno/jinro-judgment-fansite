type Role = {
  name: string;
  team: "村人" | "人狼" | "第三";
  description: string;
  tips: string;
};

const roles: Role[] = [
  {
    name: "市民",
    team: "村人",
    description: "特殊な能力を持たない村人陣営の基本役職。",
    tips: "発言や推理で村に貢献しよう。寡黙になると吊られやすいので、積極的に意見を述べることが大切。",
  },
  {
    name: "占い師",
    team: "村人",
    description: "毎晩一人を占い、人狼かどうかを知ることができる。",
    tips: "COのタイミングが重要。真占いなら信用を勝ち取る立ち回りを。偽占いに対抗できるよう結果のログを残そう。",
  },
  {
    name: "霊能者",
    team: "村人",
    description: "処刑された人が人狼だったかどうかを知ることができる。",
    tips: "占い師の真偽を判断する重要な役職。結果を正確に伝え、村の推理を助けよう。",
  },
  {
    name: "狩人",
    team: "村人",
    description: "毎晩一人を護衛し、人狼の襲撃から守ることができる。",
    tips: "占い師や霊能者など重要役職を守ろう。護衛先の読みが勝敗を分ける。連続ガードの有無を確認しよう。",
  },
  {
    name: "狂人",
    team: "村人",
    description:
      "村人陣営だが、人狼の味方。人狼が勝利すると勝ちになる。占い結果は「村人」と出る。",
    tips: "偽占い師や偽霊能者として出て、村を混乱させよう。人狼が誰かは分からないので、推理しながら立ち回る必要がある。",
  },
  {
    name: "人狼",
    team: "人狼",
    description:
      "毎晩一人を襲撃できる。人狼同士は互いを認識でき、夜に会話できる。",
    tips: "昼は村人のふりをして疑われないように。仲間との連携が重要。占い師や狩人を早めに処理したい。",
  },
  {
    name: "妖狐",
    team: "第三",
    description:
      "第三陣営。人狼に襲撃されても死なないが、占われると死ぬ。最終日まで生存していれば勝利。",
    tips: "目立たず生き残ることが最優先。占い師に占われないよう注意。グレーに潜んで最終日を目指そう。",
  },
  {
    name: "パン屋",
    team: "村人",
    description:
      "生存している間、毎朝「パンが届けられました」と表示される。死亡すると届かなくなる。",
    tips: "生存確認の指標になる役職。パンが届かなくなったら襲撃されたことが分かるので、村に情報を与えられる。",
  },
  {
    name: "双子",
    team: "村人",
    description: "ゲーム開始時に、もう一人の双子が誰かを知ることができる。",
    tips: "お互いの白を確認できるので強力。ただしCOのタイミングを間違えると両方狙われる危険がある。",
  },
];

const teamColor: Record<string, string> = {
  村人: "bg-blue-100 text-blue-800 border-blue-300",
  人狼: "bg-red-100 text-red-800 border-red-300",
  第三: "bg-purple-100 text-purple-800 border-purple-300",
};

const teamBorder: Record<string, string> = {
  村人: "border-l-blue-500",
  人狼: "border-l-red-500",
  第三: "border-l-purple-500",
};

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">
          人狼ジャッジメント ファンサイト
        </h1>
        <p className="text-lg text-gray-600">
          役職情報・立ち回り・初心者向け解説・編成考察まとめ
        </p>
      </header>

      {/* Beginner Section */}
      <section className="mb-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">
          初心者ガイド
        </h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>人狼ジャッジメント</strong>
            は、村人陣営と人狼陣営に分かれて戦うオンライン人狼ゲームです。
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>昼のフェーズ：</strong>
              全員で話し合い、怪しい人を投票で処刑します。
            </li>
            <li>
              <strong>夜のフェーズ：</strong>
              人狼が襲撃先を選び、能力者が能力を使います。
            </li>
            <li>
              <strong>勝利条件：</strong>
              村人陣営は人狼を全員処刑すれば勝ち。人狼陣営は村人と同数になれば勝ち。
            </li>
          </ul>
          <p className="mt-3 text-sm text-yellow-700">
            まずは市民や占い師など基本的な役職から覚えていきましょう！
          </p>
        </div>
      </section>

      {/* Roles Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">役職一覧</h2>
        <div className="grid gap-4">
          {roles.map((role) => (
            <div
              key={role.name}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 ${teamBorder[role.team]} p-5`}
            >
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">{role.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${teamColor[role.team]}`}
                >
                  {role.team}陣営
                </span>
              </div>
              <p className="text-gray-600 mb-2">{role.description}</p>
              <div className="bg-gray-50 rounded p-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">立ち回りのコツ：</span>
                  {role.tips}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Composition Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          おすすめ編成
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-lg font-bold mb-2">9人スタンダード村</h3>
            <p className="text-sm text-gray-500 mb-2">初心者におすすめ</p>
            <div className="flex flex-wrap gap-2">
              {["市民×3", "占い師", "霊能者", "狩人", "狂人", "人狼×2"].map(
                (r) => (
                  <span
                    key={r}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {r}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-lg font-bold mb-2">12人役職盛り村</h3>
            <p className="text-sm text-gray-500 mb-2">中級者向け</p>
            <div className="flex flex-wrap gap-2">
              {[
                "市民×3",
                "占い師",
                "霊能者",
                "狩人",
                "双子×2",
                "狂人",
                "人狼×2",
                "妖狐",
              ].map((r) => (
                <span
                  key={r}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-8 border-t border-gray-200">
        <p>
          人狼ジャッジメント ファンサイト — 非公式ファンメイドサイトです。
        </p>
      </footer>
    </div>
  );
}
