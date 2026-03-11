/** キャラクターのステータス値 */
export interface CharacterStatus {
  /** 攻撃力 */
  attack: number;
  /** 防御力 */
  defense: number;
  /** 知力（推理力） */
  intelligence: number;
  /** カリスマ（説得力） */
  charisma: number;
  /** 運 */
  luck: number;
  /** 体力 */
  stamina: number;
}

/** ユーザー評価データ */
export interface CharacterRating {
  /** 使いやすさ (1-5) */
  usability: number;
  /** 初心者おすすめ度 (1-5) */
  beginnerFriendly: number;
  /** 上級者向け度 (1-5) */
  advancedPlay: number;
  /** 汎用性 (1-5) */
  versatility: number;
  /** 人気度 (1-5) */
  popularity: number;
}

/** 得意役職 */
export interface RoleAffinity {
  role: string;
  affinity: 'S' | 'A' | 'B' | 'C' | 'D';
  comment: string;
}

/** キャラクター定義 */
export interface Character {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  description: string;
  personality: string;
  color: string;
  bgColor: string;
  status: CharacterStatus;
  rating: CharacterRating;
  roleAffinities: RoleAffinity[];
  tips: string[];
  quote: string;
}
