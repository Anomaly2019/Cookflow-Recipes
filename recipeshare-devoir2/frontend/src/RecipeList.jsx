import React, { useEffect, useState, useMemo } from 'react';
import RecipeForm from './RecipeForm.jsx';

const API_URL = 'http://localhost:8000/api/recipes/';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [onlyPublic, setOnlyPublic] = useState(true);

  // Load recipes on mount
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.results || []);
      } catch (err) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  // When a recipe is created from the form, add it at the top
  function handleCreated(newRecipe) {
    setRecipes((prev) => [newRecipe, ...prev]);
  }

  // Filter list by search + public/private
  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (onlyPublic && !r.is_public) return false;
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return (
        r.title.toLowerCase().includes(s) ||
        (r.ingredients || '').toLowerCase().includes(s)
      );
    });
  }, [recipes, onlyPublic, search]);

  return (
    <>
      {/* Create recipe form */}
      <RecipeForm onCreated={handleCreated} />

      <div className="recipe-wrapper">
        <div className="toolbar">
          <input
            type="text"
            placeholder="Rechercher une recette (titre ou ingrédients)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <label className="toggle">
            <input
              type="checkbox"
              checked={onlyPublic}
              onChange={(e) => setOnlyPublic(e.target.checked)}
            />
            <span className="toggle-label">
              Afficher seulement les recettes publiques
            </span>
          </label>
        </div>

        {loading && (
          <div className="status-row">
            <div className="spinner" />
            <span>Chargement des recettes…</span>
          </div>
        )}

        {error && !loading && (
          <div className="status-row error">
            <span>Erreur lors du chargement : {error}</span>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="status-row empty">
            <span>Aucune recette trouvée avec ces critères.</span>
          </div>
        )}

        <div className="recipe-grid">
          {filtered.map((recipe) => (
            <article key={recipe.id} className="recipe-card">
              <header className="recipe-card-header">
                <h3 className="recipe-title">{recipe.title}</h3>
                <span
                  className={`badge ${
                    recipe.is_public ? 'badge-success' : 'badge-muted'
                  }`}
                >
                  {recipe.is_public ? 'Publique' : 'Privée'}
                </span>
              </header>

              <div className="recipe-body">
                <p className="recipe-section-title">Ingrédients</p>
                <p className="recipe-text">
                  {recipe.ingredients || 'Non spécifiés.'}
                </p>

                <p className="recipe-section-title">Étapes</p>
                <p className="recipe-text">
                  {recipe.steps || 'Non précisées.'}
                </p>
              </div>

              <footer className="recipe-footer">
                <span className="price">
                  {recipe.price && recipe.price !== '0.00'
                    ? `${recipe.price} $`
                    : 'Gratuit'}
                </span>
                <span className="meta">
                  #{recipe.id} • Créée le{' '}
                  {new Date(recipe.created_at).toLocaleString()}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecipeList;
