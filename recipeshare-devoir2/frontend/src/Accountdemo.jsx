import React, { useState } from 'react';

function AccountDemo({ onSelectUser }) {
  const [form, setForm] = useState({
    email: '',
    fullName: '',
  });
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!form.email || !form.fullName) return;
    const user = {
      id: users.length + 1,
      email: form.email,
      fullName: form.fullName,
      createdAt: new Date().toLocaleString(),
    };
    const nextUsers = [user, ...users];
    setUsers(nextUsers);
    setForm({ email: '', fullName: '' });
    setSelectedId(user.id);
    onSelectUser && onSelectUser(user);
  }

  function handleSelect(user) {
    setSelectedId(user.id);
    onSelectUser && onSelectUser(user);
  }

  return (
    <div>
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Compte (démo)</h2>
          <p className="panel-subtitle">
            Création de comptes utilisateurs simulés pour illustrer le parcours
            complet : compte → paiement → historique des achats.
          </p>
        </div>
      </div>

      <form onSubmit={handleCreate} className="payment-form">
        <div className="form-field">
          <label>Adresse courriel *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Nom complet *</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <p className="form-help">
          Ici, on simule la création de comptes côté frontend. Dans une vraie
          application, ces informations seraient envoyées au backend pour être
          stockées en base de données avec gestion d&apos;authentification.
        </p>
        <button type="submit" className="btn-primary">
          Créer le compte démo
        </button>
      </form>

      {users.length > 0 && (
        <div className="payment-history">
          <h3 className="panel-title">Utilisateurs créés (démo)</h3>
          <div className="payment-history-list">
            {users.map((u) => (
              <div
                key={u.id}
                className={
                  'payment-card ' +
                  (selectedId === u.id ? 'payment-card-selected' : '')
                }
                onClick={() => handleSelect(u)}
                style={{ cursor: 'pointer' }}
              >
                <div className="payment-card-row">
                  <span className="payment-amount">{u.fullName}</span>
                  <span className="payment-status-pill">Compte démo</span>
                </div>
                <div className="payment-meta">
                  <span>{u.email}</span>
                  <span>Créé le {u.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="form-help">
            Cliquez sur un utilisateur pour le sélectionner comme client actif
            avant de faire un paiement dans l&apos;onglet &laquo; Paiement
            (démo) &raquo;.
          </p>
        </div>
      )}
    </div>
  );
}

export default AccountDemo;
