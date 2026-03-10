import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Roles from './pages/Roles'
import Beginners from './pages/Beginners'
import Compositions from './pages/Compositions'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/beginners" element={<Beginners />} />
        <Route path="/compositions" element={<Compositions />} />
      </Routes>
    </Layout>
  )
}

export default App
