import heroImg from './assets/hero.png'
import './App.css'

const externalSiteUrl = 'https://toukanno.github.io/jinro-judgment-fansite/'

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="人狼ジャッジメントのヒーロー画像" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">人狼ジャッジメント ファンサイト</p>
          <h1>役職情報をすぐ確認</h1>
          <p className="description">
            立ち回りや編成考察をまとめたブラウザ版サイトへ移動できます。
          </p>
        </div>
        <div className="hero-actions">
          <a
            className="external-link-button"
            href={externalSiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            別サイトを開く
          </a>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>このボタンでできること</h2>
          <p>GitHub Pages で公開しているブラウザ版へそのまま移動します。</p>
          <ul>
            <li>
              <a href={externalSiteUrl} target="_blank" rel="noreferrer">
                ブラウザ版サイト
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <h2>こんなときに便利</h2>
          <p>アプリ外のページで役職一覧や解説を見たいときの導線として使えます。</p>
          <ul>
            <li>
              <a href={externalSiteUrl} target="_blank" rel="noreferrer">
                すぐ開く
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
