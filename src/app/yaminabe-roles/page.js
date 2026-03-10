import data from '../../data/yaminabe-incompatible-roles.json';
import styles from './page.module.css';

export const metadata = {
  title: '闇鍋用非同村役一覧 | 人狼ジャッジメント ファンサイト',
  description: '人狼ジャッジメントの闇鍋モードで同じ村に入れない役職の組み合わせ一覧です。',
};

export default function YaminabeRolesPage() {
  const allRoleNames = data.roles.map((r) => r.name);

  return (
    <div>
      <h2 className={styles.pageTitle}>{data.title}</h2>
      <p className={styles.description}>{data.description}</p>

      {/* カード形式の一覧 */}
      <section className={styles.cardList}>
        {data.roles.map((role) => (
          <div key={role.name} className={styles.card}>
            <h3 className={styles.cardTitle}>【{role.name}】</h3>
            <div className={styles.incompatibleList}>
              {role.incompatible.map((target) => (
                <span key={target} className={styles.tag}>
                  {target}
                </span>
              ))}
            </div>
            {role.note && <p className={styles.note}>{role.note}</p>}
          </div>
        ))}
      </section>

      {/* マトリクス表 */}
      <h3 className={styles.sectionTitle}>相性マトリクス</h3>
      <p className={styles.description}>
        ✕ がついている組み合わせは同じ闇鍋村に入れません。
      </p>
      <div className={styles.tableWrapper}>
        <table className={styles.matrix}>
          <thead>
            <tr>
              <th></th>
              {allRoleNames.map((name) => (
                <th key={name} className={styles.colHeader}>
                  <span>{name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.roles.map((role) => (
              <tr key={role.name}>
                <th className={styles.rowHeader}>{role.name}</th>
                {allRoleNames.map((target) => {
                  const isIncompatible = role.incompatible.includes(target);
                  const isSelf = role.name === target;
                  return (
                    <td
                      key={target}
                      className={
                        isSelf
                          ? styles.selfCell
                          : isIncompatible
                            ? styles.incompatibleCell
                            : styles.compatibleCell
                      }
                    >
                      {isSelf ? '—' : isIncompatible ? '✕' : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.backLink}>
        <a href="/">← トップページに戻る</a>
      </div>
    </div>
  );
}
