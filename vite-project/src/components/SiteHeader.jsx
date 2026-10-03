import { NavLink } from 'react-router-dom';

export default function SiteHeader({ search, onSearch }) {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand">🍽 Flocks Rezepte</NavLink>
      <nav className="site-nav">
        <NavLink to="/" end>Rezepte</NavLink>
        {/* weitere Menüpunkte hier ergänzen, z. B. Über uns, Favoriten */}
      </nav>
      {onSearch && (
        <input
          type="search"
          className="search"
          placeholder="Rezept, Zutat oder Tag suchen…"
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      )}
    </header>
  );
}
