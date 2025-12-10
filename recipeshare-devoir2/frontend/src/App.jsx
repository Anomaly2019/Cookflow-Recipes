import React, { useState } from 'react';
import RecipeList from './RecipeList.jsx';
import PaymentDemo from './PaymentDemo.jsx';

function App() {
  const [tab, setTab] = useState('recipes'); // recipes | payment | account

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">CF</span>
          <div>
            <h1 className="brand-title">CookFlow</h1>
            <p className="brand-subtitle">
              Application web transactionnelle – gestion de recettes
            </p>
          </div>
        </div>
        <nav className="app-nav">
          <button
            className={`nav-pill ${tab === 'recipes' ? 'active' : ''}`}
            onClick={() => setTab('recipes')}
          >
            Recettes
          </button>
          <button
            className={`nav-pill ${tab === 'payment' ? 'active' : ''}`}
            onClick={() => setTab('payment')}
          >
            Paiement (démo)
          </button>
          <button
            className={`nav-pill ${tab === 'account' ? 'active' : ''}`}
            onClick={() => setTab('account')}
          >
            Mon compte
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === 'recipes' && (
          <>
            {/* HERO centré */}
            <section className="hero">
              <h2 className="hero-title">Bienvenue sur CookFlow 🍽️</h2>
              <p className="hero-subtitle">
                La plateforme pour créer, organiser et partager vos recettes,
                alimentée par un backend Django REST et un frontend React.
              </p>

              <div className="hero-actions">
                <a href="#recipes-panel" className="hero-btn hero-btn-primary">
                  Découvrir les recettes
                </a>
                <a
                  href="http://127.0.0.1:8000/api/recipes/"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-btn hero-btn-outline"
                >
                  Voir l&apos;API JSON
                </a>
              </div>

              <div className="hero-features">
                <div className="hero-card">
                  <div className="hero-card-icon">🍲</div>
                  <h3 className="hero-card-title">Pour les cuisiniers</h3>
                  <p className="hero-card-text">
                    Centralisez vos recettes, ingrédients et étapes, et
                    retrouvez‑les en un clic.
                  </p>
                </div>
                <div className="hero-card">
                  <div className="hero-card-icon">🧑‍🍳</div>
                  <h3 className="hero-card-title">Pour les équipes</h3>
                  <p className="hero-card-text">
                    Un backend Django commun et une API REST partagée pour
                    travailler en groupe.
                  </p>
                </div>
                <div className="hero-card">
                  <div className="hero-card-icon">🔒</div>
                  <h3 className="hero-card-title">Sécurisé</h3>
                  <p className="hero-card-text">
                    Permissions DRF, sessions Django et séparation claire
                    backend / frontend.
                  </p>
                </div>
              </div>
            </section>

            {/* Panel recettes */}
            <section className="panel" id="recipes-panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">Liste des recettes</h2>
                  <p className="panel-subtitle">
                    Données chargées depuis le backend Django REST
                    (/api/recipes/).
                  </p>
                </div>
              </div>
              <RecipeList />
            </section>
          </>
        )}

        {tab === 'payment' && (
          <section className="panel">
            <PaymentDemo />
          </section>
        )}

        {tab === 'account' && (
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Mon compte &amp; informations</h2>
                <p className="panel-subtitle">
                  Informations sur le projet, le contexte et les évolutions
                  possibles.
                </p>
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <h3 style={{ marginTop: 0 }}>À propos du projet</h3>
              <p>
                CookFlow est une application web transactionnelle développée
                dans le cadre d&apos;un cours de développement
                d&apos;applications web. L&apos;objectif est de démontrer une
                architecture complète : backend Django REST + frontend React,
                avec persistance en base.
              </p>
              <p>
                La section &laquo; Paiement (démo) &raquo; illustre comment on
                pourrait collecter les informations nécessaires à une
                transaction financière avant d&apos;appeler un service comme
                Stripe.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <span>
          CookFlow • Django REST API + React frontend • Projet scolaire 2025
        </span>
      </footer>
    </div>
  );
}

export default App;
