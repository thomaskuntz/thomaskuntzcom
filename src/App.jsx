import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<About />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
