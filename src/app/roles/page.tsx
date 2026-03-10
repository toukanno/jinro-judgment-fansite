import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "役職一覧 | 人狼ジャッジメント攻略",
  description: "人狼ジャッジメントに登場する全役職の能力や立ち回りを陣営別に解説します。",
};

type Role = {
  name: string;
  ability: string;
  tips: string;
};

const villagerRoles: Role[] = [
  {
    name: "市民",
    ability: "特殊な能力は持たないが、議論と推理で人狼を見つけ出す。",
    tips: "発言量を増やし、積極的に推理を展開しよう。寡黙だと処刑対象になりやすい。",
  },
  {
    name: "占い師",
    ability: "毎晩1人を占い、人狼かどうかを知ることができる。",
    tips: "CO（カミングアウト）のタイミングが重要。真占い師として信頼を勝ち取ろう。",
  },
  {
    name: "霊能者",
    ability: "処刑された人が人狼だったかどうかを知ることができる。",
    tips: "占い師の真偽を判断する重要な役職。結果はしっかりメモしておこう。",
  },
  {
    name: "騎士（狩人）",
    ability: "毎晩1人を護衛し、人狼の襲撃から守ることができる。",
    tips: "占い師や霊能者など、重要役職の護衛を優先しよう。連続ガードの可否は部屋設定による。",
  },
  {
    name: "猫又",
    ability: "人狼に襲撃されると、人狼の中からランダムに1人を道連れにする。",
    tips: "襲撃抑止力が高い。COすることで噛まれにくくなるが、処刑時は道連れが市民になるリスクも。",
  },
  {
    name: "双子",
    ability: "もう1人の双子が誰かを知っている。互いの市民確定が強力。",
    tips: "片方がCOし、もう片方が確認することで信頼を得られる。タイミングに注意。",
  },
];

const werewolfRoles: Role[] = [
  {
    name: "人狼",
    ability: "毎晩1人を襲撃できる。人狼同士は互いを認識できる。",
    tips: "市民のフリをして議論に参加しよう。仲間との連携が勝利のカギ。",
  },
  {
    name: "狂人",
    ability: "特殊な能力は持たないが、人狼陣営の勝利が自分の勝利となる。",
    tips: "占い師や霊能者を騙り、人狼を守る動きをしよう。処刑されても人狼陣営に有利。",
  },
  {
    name: "狂信者",
    ability: "狂人と同じく人狼陣営だが、人狼が誰かを知ることができる。",
    tips: "人狼を把握できるため、より効果的に市民陣営を撹乱できる。",
  },
  {
    name: "ささやく狂人",
    ability: "人狼とチャットで会話ができる狂人。",
    tips: "人狼と直接作戦を立てられる強力な役職。ただし、市民の前では慎重に。",
  },
];

const neutralRoles: Role[] = [
  {
    name: "妖狐",
    ability: "人狼に襲撃されても死なない。占われると死亡する。最終日まで生存すると勝利。",
    tips: "目立たず生き残ることが最重要。占い師に占われないよう注意しよう。",
  },
  {
    name: "恋人",
    ability: "キューピッドに指定された2人が恋人になる。恋人同士で最終日まで生き残ると勝利。",
    tips: "相方を守りつつ、自分も生存することを最優先に考えよう。",
  },
];

function RoleSection({
  title,
  roles,
  colorClass,
}: {
  title: string;
  roles: Role[];
  colorClass: string;
}) {
  return (
    <section className="mb-12">
      <h2 className={`text-2xl font-bold mb-6 ${colorClass}`}>{title}</h2>
      <div className="grid gap-4">
        {roles.map((role) => (
          <div
            key={role.name}
            className="bg-surface border border-custom rounded-lg p-5"
          >
            <h3 className="text-lg font-bold mb-2">{role.name}</h3>
            <p className="text-muted text-sm mb-2">
              <span className="text-accent-light font-semibold">能力：</span>
              {role.ability}
            </p>
            <p className="text-muted text-sm">
              <span className="text-accent-light font-semibold">コツ：</span>
              {role.tips}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function RolesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">役職一覧</h1>
      <p className="text-muted mb-10">
        人狼ジャッジメントに登場する主要な役職を陣営別にまとめています。
        各役職の能力と立ち回りのコツを確認しましょう。
      </p>
      <RoleSection title="市民陣営" roles={villagerRoles} colorClass="text-villager" />
      <RoleSection title="人狼陣営" roles={werewolfRoles} colorClass="text-werewolf" />
      <RoleSection title="第三陣営" roles={neutralRoles} colorClass="text-neutral-role" />
    </div>
  );
}
