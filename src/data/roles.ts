export type Team = "村人陣営" | "人狼陣営" | "第三陣営";

export interface Role {
  slug: string;
  name: string;
  nameEn: string;
  team: Team;
  ability: string;
  tips: string[];
}

export const roles: Role[] = [
  {
    slug: "villager",
    name: "市民",
    nameEn: "Villager",
    team: "村人陣営",
    ability: "特別な能力を持たない村人陣営の基本役職。議論と投票で人狼を見つけ出すことが仕事。",
    tips: [
      "発言量を増やして村に情報を提供しよう",
      "他の役職の発言を注意深く観察しよう",
      "論理的な推理で怪しい人物を絞り込もう",
      "寡黙になると人狼に疑われやすいので注意",
    ],
  },
  {
    slug: "werewolf",
    name: "人狼",
    nameEn: "Werewolf",
    team: "人狼陣営",
    ability:
      "夜のターンに村人を一人襲撃できる。人狼同士は夜に会話が可能。村人陣営を減らし、同数以下にすれば勝利。",
    tips: [
      "昼は村人のふりをして疑われないようにしよう",
      "仲間の人狼と連携して作戦を立てよう",
      "占い師や霊媒師など重要役職を優先的に襲撃しよう",
      "偽の役職を騙ることも有効な戦略",
    ],
  },
  {
    slug: "fortune-teller",
    name: "占い師",
    nameEn: "Fortune Teller",
    team: "村人陣営",
    ability:
      "毎晩一人を占い、その人物が人狼かどうかを知ることができる。村人陣営の最重要役職。",
    tips: [
      "結果はメモしておき、矛盾がないか確認しよう",
      "初日にカミングアウト（CO）するかどうかは編成次第",
      "グレーの中から怪しい人物を優先的に占おう",
      "偽占い師が出た場合はローラーも検討",
    ],
  },
  {
    slug: "medium",
    name: "霊媒師",
    nameEn: "Medium",
    team: "村人陣営",
    ability:
      "処刑された人物が人狼だったかどうかを知ることができる。占い師の結果と合わせて推理を進める。",
    tips: [
      "占い師の真偽を判断する手がかりになる",
      "処刑結果を正確に伝えて村の推理を助けよう",
      "偽霊媒師が出た場合は早めに対処しよう",
      "占い師が複数いる場合、霊媒結果が真偽判断の鍵になる",
    ],
  },
  {
    slug: "knight",
    name: "騎士",
    nameEn: "Knight",
    team: "村人陣営",
    ability:
      "毎晩一人を護衛し、人狼の襲撃から守ることができる。ただし自分自身は護衛できない。",
    tips: [
      "占い師や確定白を優先的に守ろう",
      "護衛成功（GJ）したら状況に応じてCOを検討",
      "人狼の襲撃先を読んで護衛先を決めよう",
      "むやみにCOすると人狼に狙われるので注意",
    ],
  },
  {
    slug: "madman",
    name: "狂人",
    nameEn: "Madman",
    team: "人狼陣営",
    ability:
      "人狼陣営だが、占い結果は「村人」と出る。人狼が誰かはわからないが、人狼陣営の勝利を目指す。",
    tips: [
      "偽占い師として出ることが多い役職",
      "人狼を庇うような投票・発言を心がけよう",
      "自分が処刑されても人狼陣営の数は減らない",
      "人狼に自分が狂人だと気づいてもらえるよう動こう",
    ],
  },
  {
    slug: "fox",
    name: "妖狐",
    nameEn: "Fox",
    team: "第三陣営",
    ability:
      "人狼に襲撃されても死なないが、占い師に占われると死亡する。村人陣営・人狼陣営の決着時に生存していれば単独勝利。",
    tips: [
      "占われないように目立たず立ち回ろう",
      "人狼に噛まれても死なないので怪しまれる場合がある",
      "最終日まで生き残ることが最優先",
      "状況に応じて村人側・人狼側どちらにも協力できる",
    ],
  },
];

export function getRoleBySlug(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getRolesByTeam(team: Team): Role[] {
  return roles.filter((r) => r.team === team);
}
