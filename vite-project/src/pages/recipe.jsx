import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import recipes from "../data/recipes";

export default function Recipe() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id) ?? null;

  if (!recipe) return <p>Recipe not found</p>;

  // Related tags from the selected recipe (new JSON shape)
  const related = useMemo(() => {
    const t = recipe?.tags ?? {};
    return {
      type: (t.type ?? []).filter(Boolean),
      occasion: (t.occasion ?? []).filter(Boolean),
      geo: (t.geo ?? []).filter(Boolean),
    };
  }, [recipe]);

  // ✅ Servings calculator state
  const baseServings = recipe.yield?.servings ?? 1;
  const [servings, setServings] = useState(baseServings);

  // ✅ Scale ingredients (respects scalable:false and missing amounts)
  const scaledIngredients = useMemo(() => {
    const factor = (servings || 1) / (baseServings || 1);

    return (recipe.ingredients ?? []).map((ing) => {
      const scalable = ing.scalable !== false;
      const canScale = typeof ing.amount === "number" && Number.isFinite(ing.amount);

      if (!scalable || !canScale) return ing;

      return {
        ...ing,
        amount: roundSmart(ing.amount * factor),
      };
    });
  }, [recipe, servings, baseServings]);

  function roundSmart(n) {
    const rounded = Math.round(n * 100) / 100;
    return Number.isInteger(rounded) ? rounded : rounded;
  }

  return (
    <main>
      {/* ✅ LAYOUT WRAPPER */}
      <div className="layout">
        {/* ✅ SIDEBAR */}
        <aside className="sidebar">
          {/* Recipe Image */}
          {recipe.image && <img src={recipe.image} alt={recipe.title} />}

          <div className="category__wrapper">
            <h2>{recipe.title}</h2>
            <strong>Art</strong>
            <div className="category__filters">
              {related.type?.length ? (
                related.type.map((tag) => (
                  <span key={tag} className="filter-btn tag-pill">
                    {tag}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>

          <div className="category__wrapper">
            <strong>Anlass</strong>
            <div className="category__filters">
              {related.occasion?.length ? (
                related.occasion.map((tag) => (
                  <span key={tag} className="filter-btn tag-pill">
                    {tag}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>

          <div className="category__wrapper">
            <strong>Küche</strong>
            <div className="category__filters">
              {related.geo?.length ? (
                related.geo.map((tag) => (
                  <span key={tag} className="filter-btn tag-pill">
                    {tag}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <p>
              <Link to="/">← Back</Link>
            </p>
          </div>
        </aside>




        {/* ✅ MAIN CONTENT */}
        <section className="recipe-content">
          {/* Times + Yield */}
          {(recipe.times?.prepMin != null || recipe.times?.cookMin != null) && (
            <p>
              <strong>Zeit:</strong>{" "}
              {recipe.times?.prepMin != null && `Prep ${recipe.times.prepMin} min`}
              {recipe.times?.prepMin != null &&
                recipe.times?.cookMin != null &&
                " · "}
              {recipe.times?.cookMin != null && `Cook ${recipe.times.cookMin} min`}
            </p>
          )}





          {/* Ingredients (scaled) */}
          {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
            <div>
              <h2>Zutaten <span className="small">(für {baseServings} {recipe.yield.unit ?? ""})</span></h2>
          {/* ✅ Ingredient calculator */}
          <div style={{ margin: "12px 0 18px" }}>
            <label style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
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

              <ul>
                {scaledIngredients.map((ing, index) => (
                  <li key={index}>
                    {ing.amount != null ? ing.amount : ""} {ing.unit ?? ""} {ing.item}
                    {ing.scalable === false ? " (fix)" : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
            <div>
              <h2>Zubereitung</h2>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Cooking Instructions */}
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
