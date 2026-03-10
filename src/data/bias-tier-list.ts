export type Tier = "S" | "A" | "B" | "C" | "D";

export interface BiasEntry {
  role: string;
  bias: string;
  detail: string;
  yahooScore: number; // Yahoo!知恵袋での言及されやすさ 1-5
}

export interface TierData {
  tier: Tier;
  label: string;
  color: string;
  entries: BiasEntry[];
}

export const tierList: TierData[] = [
  {
    tier: "S",
    label: "殿堂入り偏見",
    color: "from-red-500/20 to-red-900/20 border-red-500/50",
    entries: [
      {
        role: "占い師",
        bias: "初日占いは真占い確定と思ってる",
        detail:
          "初日に出てきた占い師をすぐ真と決め打ちして、対抗が出た瞬間に「偽確定」とか言い出す。Yahoo!知恵袋で「占い師 真偽 見分け方」で検索した結果がこれ。",
        yahooScore: 5,
      },
      {
        role: "人狼",
        bias: "人狼は黙ってれば怪しまれないと思ってる",
        detail:
          "寡黙が一番怪しいということに気づいていない。Yahoo!知恵袋で「人狼 バレない方法」と検索して「あまり喋らない」という回答を真に受けた結果。",
        yahooScore: 5,
      },
      {
        role: "霊能者",
        bias: "霊能者はとりあえずCOすればいいと思ってる",
        detail:
          "潜伏霊能という概念を知らず、ゲーム開始直後に「霊能CO！」と叫ぶ。対抗が出ると「ローラーでいいよ」と自分から言い出す。",
        yahooScore: 5,
      },
    ],
  },
  {
    tier: "A",
    label: "Yahoo!知恵袋頻出偏見",
    color: "from-orange-500/20 to-orange-900/20 border-orange-500/50",
    entries: [
      {
        role: "狩人",
        bias: "狩人は絶対に占い師を守るべきと思ってる",
        detail:
          "状況に応じた護衛先の変更という概念がない。占い師が噛まれたら「狩人仕事しろ」のオンパレード。連続ガード禁止ルールの存在を知らない人も。",
        yahooScore: 4,
      },
      {
        role: "狂人",
        bias: "狂人は占い師騙りしか仕事がないと思ってる",
        detail:
          "潜伏狂人、霊能騙り、狂アピなど多様な戦術があるのに、とにかく占い師COしか頭にない。しかも黒出しのタイミングが壊滅的に下手。",
        yahooScore: 4,
      },
      {
        role: "市民",
        bias: "市民は能力がないからつまらないと思ってる",
        detail:
          "「市民引いたらやることない」は初心者あるある最大級。推理と投票こそが市民の武器なのに、能力がない＝弱いという偏見。",
        yahooScore: 5,
      },
      {
        role: "妖狐",
        bias: "妖狐は生き残ってれば勝てると思ってる",
        detail:
          "占い師に呪殺されるリスクを軽視して堂々と発言。「銃殺対応」って何？状態でそのまま白く光って退場。",
        yahooScore: 4,
      },
    ],
  },
  {
    tier: "B",
    label: "中級者でもやりがちな偏見",
    color: "from-yellow-500/20 to-yellow-900/20 border-yellow-500/50",
    entries: [
      {
        role: "騎士",
        bias: "騎士は名乗り出たら負けだと思ってる",
        detail:
          "確定白をもらっている状況でも頑なにCOしない。結果的にグレランで吊られて「騎士でした…」と遺言を残す悲劇が頻発。",
        yahooScore: 3,
      },
      {
        role: "共有者",
        bias: "共有者は安全だから進行役やらなくていいと思ってる",
        detail:
          "確定白なのに「俺グレーの方が楽しいし…」と進行を放棄。共有者の最大の仕事が進行であることをYahoo!知恵袋で教わるまで気づかない。",
        yahooScore: 3,
      },
      {
        role: "猫又",
        bias: "猫又は吊られたら道連れだから最強と思ってる",
        detail:
          "噛まれたときのランダム道連れと吊られたときの道連れを混同。人外に噛まれないようにするゲームメイクを完全に無視。",
        yahooScore: 3,
      },
      {
        role: "パン屋",
        bias: "パン屋は毎朝のパンが焼ける演出が本体と思ってる",
        detail:
          "「おはようございます。今日もパンが美味しく焼けました」のメッセージに全力を注ぎ、推理を完全に放棄。パン屋が死んだら「パンが…」と嘆く村。",
        yahooScore: 4,
      },
    ],
  },
  {
    tier: "C",
    label: "地味だけど根深い偏見",
    color: "from-green-500/20 to-green-900/20 border-green-500/50",
    entries: [
      {
        role: "魔女",
        bias: "魔女の毒は初日に使うべきと思ってる",
        detail:
          "「早く使わないともったいない」精神で初日に毒をぶちまける。結果、村の重要役職を毒殺して戦犯になるパターン。",
        yahooScore: 2,
      },
      {
        role: "双子",
        bias: "双子は即カミングアウトが正義と思ってる",
        detail:
          "相方の安全を確認せずに「双子CO！相方は○○さん！」と初日から全公開。人狼に相方を速攻で噛まれて1ターンで無能力化。",
        yahooScore: 2,
      },
      {
        role: "逃亡者",
        bias: "逃亡者は人狼のところに逃げなければ安全と思ってる",
        detail:
          "逃亡先の選択がゲームの命運を握るのに「まあ適当に逃げればいいっしょ」のノリ。占い師のところに逃げ続けて護衛とバッティングする天才プレイも。",
        yahooScore: 2,
      },
    ],
  },
  {
    tier: "D",
    label: "知る人ぞ知るニッチ偏見",
    color: "from-blue-500/20 to-blue-900/20 border-blue-500/50",
    entries: [
      {
        role: "恋人",
        bias: "恋人は相方を絶対に守れると思ってる",
        detail:
          "恋人陣営の勝利条件を理解せず、ただ「相方を守りたい」という気持ちだけでプレイ。結果的に村を崩壊させても「愛だから仕方ない」。",
        yahooScore: 2,
      },
      {
        role: "サイコ",
        bias: "サイコは適当に暴れればいいと思ってる",
        detail:
          "独自の勝利条件を活かした戦略を練る代わりに、ただ場を荒らすだけのプレイ。「サイコだから何してもいい」は違う。",
        yahooScore: 1,
      },
      {
        role: "てるてる坊主",
        bias: "てるてる坊主は処刑されたいアピールすればいいと思ってる",
        detail:
          "「僕を吊ってください！」は逆に怪しまれて吊られない罠。絶妙に怪しい発言をして自然に吊られる技術が求められるのに、直球すぎて逆に生存。",
        yahooScore: 2,
      },
    ],
  },
];
