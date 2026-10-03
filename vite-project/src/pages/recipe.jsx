import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import recipes from "../data/recipes";
import "../App.css";
import SiteHeader from "../components/SiteHeader";

const fmt = (n) => (Math.round(n * 100) / 100).toString().replace(".", ",");

export default function Recipe() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id) ?? null;

  const baseServings = recipe?.yield?.servings ?? 1;

  const [servings, setServings] = useState(baseServings);
  const [checked, setChecked] = useState({});
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    setServings(baseServings);
    setChecked({});
    setImageOpen(false);
  }, [id, baseServings]);

  if (!recipe) {
    return (
      <main className="recipe">
        <p>Rezept nicht gefunden.</p>
        <Link to="/">Zurück</Link>
      </main>
    );
  }

  const factor = servings / baseServings;
  const total = (recipe.times?.prepMin ?? 0) + (recipe.times?.cookMin ?? 0);

  return (
    <main className="page recipe">
      <SiteHeader />
      <article className="recipe__body">
        {/* Link "Alle Rezepte" entfernt */}

        <div className={`hero ${imageOpen ? "hero--open" : ""}`}>
          {recipe.image ? (
            <img src={recipe.image} alt={recipe.title} loading="lazy" />
          ) : (
            <div className="hero__placeholder">🍲</div>
          )}
          <h1 className="hero__title">{recipe.title}</h1>
          {recipe.image && (
            <button
              type="button"
              className="img-toggle img-toggle--overlay"
              aria-expanded={imageOpen}
              onClick={() => setImageOpen((o) => !o)}
            >
              {imageOpen ? "Verkleinern ▲" : "Vergrößern ▼"}
            </button>
          )}
        </div>

        {recipe.description && <p className="lead">{recipe.description}</p>}

        <div className="meta">
          <span>⏱ Vorbereitung {recipe.times?.prepMin ?? 0} Min</span>
          <span>🔥 Garzeit {recipe.times?.cookMin ?? 0} Min</span>
          <span>Σ {total} Min</span>
        </div>

        <div className="recipe__grid">
          <section className="panel">
            <div className="servings">
              <h2>Zutaten</h2>
              <div
                className="servings__ctrl"
                role="group"
                aria-label="Portionen"
              >
                <button
                  type="button"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  aria-label="Weniger"
                >
                  −
                </button>
                <span className="servings__value">
                  {servings} {recipe.yield?.unit ?? "Portionen"}
                </span>
                <button
                  type="button"
                  onClick={() => setServings((s) => s + 1)}
                  aria-label="Mehr"
                >
                  +
                </button>
              </div>
            </div>

            {recipe.ingredientGroups.map((group) => (
              <div key={group.key}>
                {recipe.ingredientGroups.length > 1 && <h3>{group.title}</h3>}
                <ul className="ingredients">
                  {group.ingredients.map((ing, i) => {
                    const k = `${group.key}-${i}`;
                    return (
                      <li key={k} className={checked[k] ? "done" : ""}>
                        <label>
                          <input
                            type="checkbox"
                            checked={!!checked[k]}
                            onChange={() =>
                              setChecked((c) => ({ ...c, [k]: !c[k] }))
                            }
                          />
                          <span>
                            {ing.amount != null && (
                              <strong>
                                {fmt(ing.amount * factor)} {ing.unit ?? ""}{" "}
                              </strong>
                            )}
                            {ing.item}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>

          <section className="panel">
            <h2>Zubereitung</h2>
            <ol className="steps">
              {recipe.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            {recipe.cookingInstructions && (
              <p className="note">🔥 {recipe.cookingInstructions}</p>
            )}
          </section>
        </div>
      </article>
    </main>
  );
}
