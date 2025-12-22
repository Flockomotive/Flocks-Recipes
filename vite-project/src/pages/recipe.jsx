import { useParams, Link } from 'react-router-dom'
import recipes from '../data/recipes.json'

export default function Recipe() {
  const { id } = useParams()
  const recipe = recipes.find(r => r.id === id)

  if (!recipe) {
    return <p>Recipe not found</p>
  }

  return (
    <main>
      <h1>{recipe.title}</h1>
      <p>
        Prep: {recipe.prepTime} | Cook: {recipe.cookTime}
      </p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <Link to="/">← Back</Link>
    </main>
  )
}
