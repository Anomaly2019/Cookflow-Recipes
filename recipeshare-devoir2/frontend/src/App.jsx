import React from 'react';
import RecipeList from './RecipeList.jsx';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">RS</span>
          <div>
            <h1 className="brand-title">RecipeShare</h1>
            <p className="brand-subtitle">Application web transactionnelle – recettes partagées</p>
          </div>
        </div>
        <nav className="app-nav">
          <span className="nav-pill active">Recettes</span>
          <span className="nav-pill">Mon compte</span>
        </nav>
      </header>

      <main className="app-main">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Liste des recettes</h2>
              <p className="panel-subtitle">
                Données chargées depuis le backend Django REST (/api/recipes/).
              </p>
            </div>
          </div>
          <RecipeList />
        </section>
      </main>

      <footer className="app-footer">
        <span>RecipeShare • Backend Django + Frontend React</span>
      </footer>
    </div>
  );
}

export default App;
