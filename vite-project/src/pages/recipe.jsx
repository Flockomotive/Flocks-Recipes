import { useParams, Link } from 'react-router-dom'
import recipes from '../../data/recipes'

export default function Recipe() {
  const { id } = useParams()
  const recipe = recipes.find(r => r.id === id)

  if (!recipe) {
    return <p>Recipe not found</p>
  }

  return (
    <div className="recipe">
      <h1>{recipe.title}</h1>

      {/* Recipe Image */}
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          style={{ width: '300px', borderRadius: '8px', margin: '10px 0' }} 
        />
      )}

      {/* Optional Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <p>
          <strong>Tags:</strong> {recipe.tags.join(', ')}
        </p>
      )}

      {/* Kategorie */}
      {recipe.category && recipe.category.length > 0 && (
        <p>
          <strong>Kategorie:</strong> {recipe.category}
        </p>
      )}

      {/* Ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div>
          <h2>Zutaten</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      {recipe.steps && recipe.steps.length > 0 && (
        <div>
          <h2>Zubereitung</h2>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Optional Cooking Instructions */}
      {recipe.cooking_instructions && (
        <div>
          <h2>Zubereitung</h2>
          <p>{recipe.cooking_instructions}</p>
        </div>
      )}
    </div>
  );
}