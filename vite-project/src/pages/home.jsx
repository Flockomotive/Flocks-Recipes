import { useState } from 'react';
import { Link } from 'react-router-dom';
import recipes from '../data/recipes';
import SiteHeader from '../components/SiteHeader';
import Icon from '../components/Icon';
import '../App.css';

// Küchen-Varianten vereinheitlichen
const normalizeGeo = (g) => {
  if (/österreich|oesterreich/i.test(g)) return 'Österreichisch';
  if (/deutsch/i.test(g)) return 'Deutsch';
  return g;
};

// Doppelte Rezepte (gleiche id) entfernen und geo normalisieren
const uniqueRecipes = [...new Map(recipes.map(r => [r.id, r])).values()].map(r => ({
  ...r,
  tags: {
    ...r.tags,
    geo: [...new Set((r.tags?.geo ?? []).map(normalizeGeo))],
  },
}));

const typeIconMap = { Vegetarisch: 'veggie', Vegan: 'veggie', Aufläufe: 'dish', Pasta: 'pasta', Fleisch: 'meat', Fisch: 'fish', Suppe: 'veggie', Salat: 'veggie', Backen: 'bake' };
const typeIcon = (t) => typeIconMap[t] ?? 'dish';

const occasionIconMap = {
  Sonntagsrezepte: 'pot',
  Sonntagrezepte: 'pot',
  Kaffee: 'coffee',
  Frühstück: 'sun',
  'Schnelle Rezepte': 'clock',
  'Schnellere Rezepte': 'clock',
};
const occasionIcon = (t) => occasionIconMap[t] ?? 'party';

const flagMap = {
  Italienisch: '🇮🇹', Deutsch: '🇩🇪', Österreichisch: '🇦🇹', Französisch: '🇫🇷', Spanisch: '🇪🇸',
  Griechisch: '🇬🇷', Indisch: '🇮🇳', Mexikanisch: '🇲🇽', Asiatisch: '🥢',
  Amerikanisch: '🇺🇸', Thailändisch: '🇹🇭', Japanisch: '🇯🇵', Türkisch: '🇹🇷',
};
const geoIcon = (g) => (flagMap[g] ? `flag:${flagMap[g]}` : 'globe');

export default function Home() {
  const [typeTagSelected, setTypeTagSelected] = useState(null);
  const [occasionTagSelected, setOccasionTagSelected] = useState(null);
  const [geoTagSelected, setGeoTagSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [quickOnly, setQuickOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCount =
    (typeTagSelected ? 1 : 0) + (occasionTagSelected ? 1 : 0) + (geoTagSelected ? 1 : 0) + (quickOnly ? 1 : 0);

  const totalTime = (r) => (r.times?.prepMin ?? 0) + (r.times?.cookMin ?? 0);

  const sorters = {
    name: (a, b) => a.title.localeCompare(b.title, 'de'),
    time: (a, b) => totalTime(a) - totalTime(b),
    newest: (a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
  };

  // Available tags
  const typeTags = [...new Set(uniqueRecipes.flatMap(r => r.tags?.type ?? []))];
  const occasionTags = [...new Set(uniqueRecipes.flatMap(r => r.tags?.occasion ?? []))];
  const geoTags = [...new Set(uniqueRecipes.flatMap(r => r.tags?.geo ?? []))];

  // Einzelauswahl: gleicher Klick hebt auf, anderer Klick ersetzt
  const toggle = (tag, selected, setSelected) => {
    setSelected(selected === tag ? null : tag);
  };

  const hasActiveFilters = !!(typeTagSelected || occasionTagSelected || geoTagSelected);

  const resetFilters = () => {
    setTypeTagSelected(null);
    setOccasionTagSelected(null);
    setGeoTagSelected(null);
    setSearch('');
    setQuickOnly(false);
  };

  const matchesFilters = (recipe) => {
    const q = search.trim().toLowerCase();
    if (q) {
      const haystack = [
        recipe.title,
        ...Object.values(recipe.tags ?? {}).flat(),
        ...(recipe.ingredientGroups ?? []).flatMap(g => g.ingredients.map(i => i.item)),
      ].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (quickOnly && totalTime(recipe) >= 30) return false;

    if (!hasActiveFilters) return true;

    const typeMatch = !typeTagSelected || (recipe.tags?.type ?? []).includes(typeTagSelected);
    const occasionMatch = !occasionTagSelected || (recipe.tags?.occasion ?? []).includes(occasionTagSelected);
    const geoMatch = !geoTagSelected || (recipe.tags?.geo ?? []).includes(geoTagSelected);

    return typeMatch && occasionMatch && geoMatch;
  };

  const filterGroup = (label, tags, selected, setSelected, iconFn) => (
    <div className="filter-group">
      <h4>{label}</h4>
      <div className="filter-list">
        {tags.map(tag => {
          const active = selected === tag;
          return (
            <button
              key={tag}
              type="button"
              className={`filter-btn ${active ? 'active' : ''}`}
              aria-pressed={active}
              onClick={() => toggle(tag, selected, setSelected)}
            >
              <span className="filter-btn__icon">
                {iconFn(tag).startsWith('flag:')
                  ? <span className="flag">{iconFn(tag).slice(5)}</span>
                  : <Icon name={iconFn(tag)} />}
              </span>
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );

  // Reusable list renderer
  const renderCategory = (title, key) => {
    const list = uniqueRecipes
      .filter(r => r.category === key)
      .filter(matchesFilters)
      .sort(sorters[sort]);
    return (
      <section className="category">
        <h2>
          {title} <span className="count">{list.length}</span>
        </h2>
        <ul>
          {list.map(recipe => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`} className="recipe-card">
                <span className="recipe-card__title">{recipe.title}</span>
              </Link>
            </li>
          ))}
          {list.length === 0 && <li className="empty">Keine Rezepte</li>}
        </ul>
      </section>
    );
  };

  return (
    <main className="page">
      <SiteHeader search={search} onSearch={setSearch} />

      <div className="home-layout">
        <button
          type="button"
          className="filter-toggle"
          aria-expanded={filtersOpen}
          aria-controls="filter-panel"
          onClick={() => setFiltersOpen(o => !o)}
        >
          <span>Filter{activeCount > 0 ? ` (${activeCount})` : ''}</span>
          <span aria-hidden="true">{filtersOpen ? '▲' : '▼'}</span>
        </button>

        <aside id="filter-panel" className={`filter-panel ${filtersOpen ? 'open' : ''}`}>
          {filterGroup('Art', typeTags, typeTagSelected, setTypeTagSelected, typeIcon)}
          {occasionTags.length > 0 &&
            filterGroup('Anlass', occasionTags, occasionTagSelected, setOccasionTagSelected, occasionIcon)}
          {filterGroup('Küche', geoTags, geoTagSelected, setGeoTagSelected, geoIcon)}

          <div className="filter-group">
            <h4>Sortieren</h4>
            <select className="select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="name">Name</option>
              <option value="time">Zeit</option>
              <option value="newest">Neueste</option>
            </select>
            <label className="check">
              <input type="checkbox" checked={quickOnly} onChange={e => setQuickOnly(e.target.checked)} />
              Schnell (&lt; 30 Min)
            </label>
          </div>

          {(hasActiveFilters || search || quickOnly) && (
            <button type="button" className="reset-btn" onClick={resetFilters}>
              Filter zurücksetzen
            </button>
          )}
        </aside>

        <div className="content">
          <div className="categories">
            {renderCategory('Vorspeise', 'Vorspeise')}
            {renderCategory('Hauptgerichte', 'Hauptgericht')}
            {renderCategory('Dessert', 'Dessert')}
            {renderCategory('Appetizer / Snack / Beilagen', 'Appetizer')}
          </div>
        </div>
      </div>
    </main>
  );
}
