import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Beginner from "./pages/Beginner";
import Compositions from "./pages/Compositions";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>
            <Link to="/">人狼ジャッジメント ファンサイト</Link>
          </h1>
          <nav>
            <ul>
              <li><Link to="/">ホーム</Link></li>
              <li><Link to="/roles">役職一覧</Link></li>
              <li><Link to="/beginner">初心者ガイド</Link></li>
              <li><Link to="/compositions">編成考察</Link></li>
            </ul>
          </nav>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/beginner" element={<Beginner />} />
            <Route path="/compositions" element={<Compositions />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2026 人狼ジャッジメント ファンサイト</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
