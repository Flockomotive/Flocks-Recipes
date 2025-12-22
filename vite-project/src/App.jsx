import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Recipe from './pages/recipe'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes/:id" element={<Recipe />} />
    </Routes>
  )
}