import { useState } from 'react';
import { Link } from 'react-router-dom';
import recipes from '../data/recipes.json';

export default function Home() {
  const [typeTagsSelected, setTypeTagsSelected] = useState([]);
  const [styleTagsSelected, setStyleTagsSelected] = useState([]);
  const [geoTagsSelected, setGeoTagsSelected] = useState([]);

  // Categories
  const categories = [...new Set(recipes.map(r => r.category).filter(Boolean))];

  // Available tags
  const typeTags = [...new Set(recipes.flatMap(r => r['tags-type'] || []))];
  const styleTags = [...new Set(recipes.flatMap(r => r['tags-style'] || []))];
  const geoTags = [...new Set(recipes.flatMap(r => r['tags-geo'] || []))];

  // Toggle helper
  const toggle = (tag, selected, setSelected) => {
    setSelected(
      selected.includes(tag)
        ? selected.filter(t => t !== tag)
        : [...selected, tag]
    );
  };

  // Check if ANY filter is active
  const hasActiveFilters =
    typeTagsSelected.length > 0 ||
    styleTagsSelected.length > 0 ||
    geoTagsSelected.length > 0;

  // Filtering logic
  const matchesFilters = (recipe) => {
    if (!hasActiveFilters) return true;

    const typeMatch =
      typeTagsSelected.length === 0 ||
      recipe['tags-type']?.some(tag => typeTagsSelected.includes(tag));

    const styleMatch =
      styleTagsSelected.length === 0 ||
      recipe['tags-style']?.some(tag => styleTagsSelected.includes(tag));

    const geoMatch =
      geoTagsSelected.length === 0 ||
      recipe['tags-geo']?.some(tag => geoTagsSelected.includes(tag));

    return typeMatch && styleMatch && geoMatch;
  };

  return (
    <main>
      <h1>My Recipes</h1>

      {/* Filters */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Art des Gerichts</h3>

        <div>
          <strong>Type:</strong><br />
          {typeTags.map(tag => (
            <label key={tag} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                checked={typeTagsSelected.includes(tag)}
                onChange={() => toggle(tag, typeTagsSelected, setTypeTagsSelected)}
              /> {tag}
            </label>
          ))}
        </div>

        <div>
          <strong>Anlass:</strong><br />
          {styleTags.map(tag => (
            <label key={tag} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                checked={styleTagsSelected.includes(tag)}
                onChange={() => toggle(tag, styleTagsSelected, setStyleTagsSelected)}
              /> {tag}
            </label>
          ))}
        </div>

        <div>
          <strong>Cousine:</strong><br />
          {geoTags.map(tag => (
            <label key={tag} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                checked={geoTagsSelected.includes(tag)}
                onChange={() => toggle(tag, geoTagsSelected, setGeoTagsSelected)}
              /> {tag}
            </label>
          ))}
        </div>
      </section>

      {/* Recipes by category */}

      {/* Vorpseise */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Vorpseiße</h2>
        <ul>
          {recipes
            .filter(r => r.category === 'Vorpseise')
            .filter(matchesFilters)
            .map(recipe => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </li>
            ))}
        </ul>
      </section>

      {/* Hauptgerichte */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Hauptgerichte</h2>
        <ul>
          {recipes
            .filter(r => r.category === 'Hauptgericht')
            .filter(matchesFilters)
            .map(recipe => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </li>
            ))}
        </ul>
      </section>

      {/* Desserts */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Dessert</h2>
        <ul>
          {recipes
            .filter(r => r.category === 'Dessert')
            .filter(matchesFilters)
            .map(recipe => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </li>
            ))}
        </ul>
      </section>

      {/* Appetizer */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Appetizer/Snack/Beilagen</h2>
        <ul>
          {recipes
            .filter(r => r.category === 'Appetizer')
            .filter(matchesFilters)
            .map(recipe => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}


