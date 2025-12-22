import { Link } from 'react-router-dom'
import recipes from '../data/recipes.json'

export default function Home() {
  return (
    <main>
      <h1>My Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}