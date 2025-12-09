import React, { useState } from 'react';

const API_URL = 'http://localhost:8000/api/recipes/';

function RecipeForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [price, setPrice] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // send Django session cookie
        body: JSON.stringify({
          title,
          ingredients,
          steps,
          price: price || null,
          is_public: isPublic,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      onCreated && onCreated(data);

      // reset form
      setTitle('');
      setIngredients('');
      setSteps('');
      setPrice('');
      setIsPublic(true);
    } catch (err) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Ajouter une recette</h3>
      <p className="form-help">
        Pour créer une recette depuis le frontend, vous devez être connecté dans Django
        (via /admin) dans ce même navigateur.
      </p>

      {error && <div className="status-row error">Erreur : {error}</div>}

      <div className="form-grid">
        <label className="form-field">
          <span>Titre *</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Pâtes à la tomate"
          />
        </label>

        <label className="form-field">
          <span>Prix</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </label>

        <label className="form-field form-field-full">
          <span>Ingrédients</span>
          <textarea
            rows="2"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Tomates, pâtes, huile d'olive..."
          />
        </label>

        <label className="form-field form-field-full">
          <span>Étapes</span>
          <textarea
            rows="3"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="1. Faire bouillir l'eau..."
          />
        </label>

        <label className="form-field">
          <span>Visibilité</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span className="toggle-label">Recette publique</span>
          </label>
        </label>
      </div>

      <button className="btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Enregistrement...' : 'Enregistrer la recette'}
      </button>
    </form>
  );
}

export default RecipeForm;
