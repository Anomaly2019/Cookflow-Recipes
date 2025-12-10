import React, { useState } from 'react';

function PaymentDemo() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    country: '',
    province: '',
    phone: '',
    amount: '',
  });

  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const payment = {
      id: history.length + 1,
      ...form,
      date: now.toLocaleString(),
      status: 'Succès (simulation)',
    };
    setHistory((prev) => [payment, ...prev]);
    setStatus('Paiement simulé avec succès. Aucune carte réelle utilisée.');
  }

  return (
    <div>
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Paiement (démo)</h2>
          <p className="panel-subtitle">
            Formulaire de paiement simulé inspiré d&apos;une interface réelle.
            Les données sont stockées uniquement côté frontend pour le devoir.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="payment-two-cols">
          <div className="form-field">
            <label>Prénom *</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Nom *</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label>Adresse *</label>
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="payment-two-cols">
          <div className="form-field">
            <label>Ville *</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Province / État (optionnel)</label>
            <input
              name="province"
              value={form.province}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="payment-two-cols">
          <div className="form-field">
            <label>Pays *</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un pays</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="USA">États‑Unis</option>
            </select>
          </div>
          <div className="form-field">
            <label>Téléphone *</label>
            <input
              name="phone"
              placeholder="+1 555 123 4567"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label>Montant de la commande (CA$) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <p className="form-help">
          Cette étape illustre la collecte des informations nécessaires à un
          paiement. Dans une vraie application, ces données seraient envoyées à
          un prestataire comme Stripe ou PayPal.
        </p>

        <button type="submit" className="btn-primary">
          Simuler le paiement
        </button>

        {status && <p className="payment-status">{status}</p>}
      </form>

      {history.length > 0 && (
        <div className="payment-history">
          <h3 className="panel-title">Historique des paiements simulés</h3>
          <p className="panel-subtitle">
            Exemple de journal des transactions (stocké uniquement en mémoire
            pour la démonstration).
          </p>
          <div className="payment-history-list">
            {history.map((p) => (
              <div key={p.id} className="payment-card">
                <div className="payment-card-row">
                  <span className="payment-amount">CA${p.amount}</span>
                  <span className="payment-status-pill">{p.status}</span>
                </div>
                <div className="payment-meta">
                  <span>
                    {p.firstName} {p.lastName} – {p.city},{' '}
                    {p.country || 'N/A'}
                  </span>
                  <span>Le {p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentDemo;
