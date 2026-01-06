import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import recipes from "../data/recipes";

export default function Recipe() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id) ?? null;

  if (!recipe) return <p>Recipe not found</p>;

  const related = useMemo(() => {
    const t = recipe?.tags ?? {};
    return {
      type: (t.type ?? []).filter(Boolean),
      occasion: (t.occasion ?? []).filter(Boolean),
      geo: (t.geo ?? []).filter(Boolean),
    };
  }, [recipe]);

  const baseServings = recipe.yield?.servings ?? 1;
  const [servings, setServings] = useState(baseServings);

  function roundSmart(n) {
    const rounded = Math.round(n * 100) / 100;
    return Number.isInteger(rounded) ? rounded : rounded;
  }

  // ✅ Scale grouped ingredients ONLY
  const scaledIngredientGroups = useMemo(() => {
    const factor = (servings || 1) / (baseServings || 1);

    return recipe.ingredientGroups.map((group) => ({
      ...group,
      ingredients: group.ingredients.map((ing) => {
        const scalable = ing.scalable !== false;
        const canScale =
          typeof ing.amount === "number" && Number.isFinite(ing.amount);

        if (!scalable || !canScale) return ing;

        return {
          ...ing,
          amount: roundSmart(ing.amount * factor),
        };
      }),
    }));
  }, [recipe, servings, baseServings]);

  return (
    <main>
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          {recipe.image && <img src={recipe.image} alt={recipe.title} />}

          <div className="category__wrapper">
            <h2>{recipe.title}</h2>
            <strong>Art</strong>
            <div className="category__filters">
              {related.type.map((tag) => (
                <span key={tag} className="filter-btn tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="category__wrapper">
            <strong>Anlass</strong>
            <div className="category__filters">
              {related.occasion.map((tag) => (
                <span key={tag} className="filter-btn tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="category__wrapper">
            <strong>Küche</strong>
            <div className="category__filters">
              {related.geo.map((tag) => (
                <span key={tag} className="filter-btn tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p style={{ marginTop: 12 }}>
            <Link to="/">← Back</Link>
          </p>
        </aside>

        {/* MAIN CONTENT */}
        <section className="recipe-content">
          {(recipe.times?.prepMin != null || recipe.times?.cookMin != null || recipe.times?.fullMin != null) && (
            <p>
              <strong>Zeit:</strong>{" "}
              {recipe.times?.prepMin != null && `Vorbereitungszeit: ${recipe.times.prepMin} min  ·  Koch-/Backzeit: ${recipe.times.cookMin} min  ·  Gesamtzeit: ${recipe.times.fullMin} min`}
            </p>
          )}

          {/* INGREDIENTS */}
          <div>
            <h2>
              Zutaten{" "}
              <span className="small">
                (für {baseServings} {recipe.yield?.unit ?? ""})
              </span>
            </h2>

            {/* Portion calculator */}
            <div style={{ margin: "12px 0 18px" }}>
              <label style={{ display: "inline-flex", gap: 10 }}>
                <strong>Portionen:</strong>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  style={{ width: 90, padding: 6 }}
                />
                <span>{recipe.yield?.unit ?? ""}</span>
              </label>
            </div>

            {/* Grouped list */}
            {scaledIngredientGroups.map((group) => (
              <div key={group.key} style={{ marginBottom: 16 }}>
                <h4>{group.title}</h4>
                <ul>
                  {group.ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.amount != null ? ing.amount : ""}{" "}
                      {ing.unit ?? ""} {ing.item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div>
            <h2>Zubereitung</h2>
            <ol>
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {recipe.cookingInstructions && (
            <div>
              <h2>Backofen / Hinweise</h2>
              <p>{recipe.cookingInstructions}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
