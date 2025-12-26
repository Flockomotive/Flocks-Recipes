import { useState } from 'react';
import { Link } from 'react-router-dom';
import recipes from '../data/recipes';
import './home.css';
import '../App.css';

export default function Home() {
  const [typeTagsSelected, setTypeTagsSelected] = useState([]);
  const [occasionTagsSelected, setoccasionTagsSelected] = useState([]);
  const [geoTagsSelected, setGeoTagsSelected] = useState([]);

  // Available tags
  const typeTags = [...new Set(recipes.flatMap(r => r['tags-type'] || []))];
  const occasionTags = [...new Set(recipes.flatMap(r => r['tags-occasion'] || []))];
  const geoTags = [...new Set(recipes.flatMap(r => r['tags-geo'] || []))];

  const toggle = (tag, selected, setSelected) => {
    setSelected(
      selected.includes(tag)
        ? selected.filter(t => t !== tag)
        : [...selected, tag]
    );
  };

  const hasActiveFilters =
    typeTagsSelected.length > 0 ||
    occasionTagsSelected.length > 0 ||
    geoTagsSelected.length > 0;

  const matchesFilters = (recipe) => {
    if (!hasActiveFilters) return true;

    const typeMatch =
      typeTagsSelected.length === 0 ||
      recipe['tags-type']?.some(tag => typeTagsSelected.includes(tag));

    const occasionMatch =
      occasionTagsSelected.length === 0 ||
      recipe['tags-occasion']?.some(tag => occasionTagsSelected.includes(tag));

    const geoMatch =
      geoTagsSelected.length === 0 ||
      recipe['tags-geo']?.some(tag => geoTagsSelected.includes(tag));

    return typeMatch && occasionMatch && geoMatch;
  };

  return (
    <main>
      <h1>My Recipes</h1>

      {/* ✅ LAYOUT WRAPPER */}
      <div className="layout">

        {/* ✅ SIDEBAR */}
<aside className="sidebar">
  <h3>Filter</h3>

  <div>
    <strong>Art</strong>
    {typeTags.map(tag => {
      const active = typeTagsSelected.includes(tag);

      return (
        <button
          key={tag}
          type="button"
          className={`filter-btn ${active ? "active" : ""}`}
          aria-pressed={active}
          onClick={() =>
            toggle(tag, typeTagsSelected, setTypeTagsSelected)
          }
        >
          {tag}
        </button>
      );
    })}
  </div>

  <div>
    <strong>Anlass</strong>
    {occasionTags.map(tag => {
      const active = occasionTagsSelected.includes(tag);

      return (
        <button
          key={tag}
          type="button"
          className={`filter-btn ${active ? "active" : ""}`}
          aria-pressed={active}
          onClick={() =>
            toggle(tag, occasionTagsSelected, setoccasionTagsSelected)
          }
        >
          {tag}
        </button>
      );
    })}
  </div>

  <div>
    <strong>Küche</strong>
    {geoTags.map(tag => {
      const active = geoTagsSelected.includes(tag);

      return (
        <button
          key={tag}
          type="button"
          className={`filter-btn ${active ? "active" : ""}`}
          aria-pressed={active}
          onClick={() =>
            toggle(tag, geoTagsSelected, setGeoTagsSelected)
          }
        >
          {tag}
        </button>
      );
    })}
  </div>
</aside>

        {/* ✅ MAIN CONTENT */}
        <div className="content">
          <div className="categories">

          {/* Vorspeise */}
          <section className="category">
            <h2>Vorspeise</h2>
            <ul>
              {recipes
                .filter(r => r.category === 'Vorspeise')
                .filter(matchesFilters)
                .map(recipe => (
                  <li key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                  </li>
                ))}
            </ul>
          </section>

          {/* Hauptgerichte */}
          <section className="category">
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

          {/* Dessert */}
          <section className="category">
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
          <section className="category">
            <h2>Appetizer / Snack / Beilagen</h2>
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
          </div>        
        </div>
      </div>
    </main>
  );
}
