Here is a single-block `README.md` adapted to your structure (`backend/` and `frontend/` folders under `recipeshare-devoir2/`).[1]

```markdown
# RecipeShare – Application web transactionnelle

Projet scolaire : application de partage de recettes avec **backend Django REST** et **frontend React**.

- Backend : Django 6 + Django REST Framework
- Frontend : React + Vite
- Base de données : SQLite (développement)
- Fonctionnalité principale : gestion de recettes (CRUD) via API et interface web

---

## 1. Structure du projet
```

recipeshare-devoir2/
├── backend/
│ ├── manage.py
│ ├── recipeshare/ # projet Django (settings, urls, etc.)
│ └── recipes/ # application Django (modèle Recipe + API)
└── frontend/
├── node_modules/
├── public/
├── src/ # React (App, RecipeList, RecipeForm, styles)
├── index.html
├── package.json
├── vite.config.js
└── README.md (frontend)

```

---

## 2. Prérequis

- Python 3.13 (ou version utilisée pour le projet)
- Node.js et npm
- pip / venv

---

## 3. Installation et lancement du backend (Django + API)

Depuis le dossier racine `recipeshare-devoir2` :

```

cd backend

# 1. Créer et activer l'environnement virtuel (si pas déjà fait)

python -m venv venv
venv\Scripts\activate # Windows

# 2. Installer les dépendances Python

pip install -r requirements.txt

# 3. Appliquer les migrations

python manage.py migrate

# 4. Créer un superutilisateur pour accéder à /admin

python manage.py createsuperuser

```

Lancer le serveur de développement :

```

python manage.py runserver

```

Le backend est alors disponible sur :

- API recettes : `http://127.0.0.1:8000/api/recipes/`
- Admin Django : `http://127.0.0.1:8000/admin/`

---

## 4. Installation et lancement du frontend (React + Vite)

Dans un **autre** terminal, depuis le dossier racine :

```

cd frontend

# 1. Installer les dépendances Node

npm install

# 2. Lancer le serveur de développement

npm run dev

````

Le frontend est alors accessible sur :

- `http://localhost:5173/`

---

## 5. Fonctionnalités réalisées

### Backend (Django + DRF)

- Modèle `Recipe` :
  - `title` (titre)
  - `ingredients`
  - `steps`
  - `price`
  - `is_public`
  - `user` (ForeignKey vers l’utilisateur Django)
  - `created_at` (date de création)
- Admin :
  - Gestion complète des recettes dans `/admin/recipes/recipe/`
- API REST :
  - `GET /api/recipes/` : liste paginée des recettes
  - `POST /api/recipes/` : création d’une recette
  - `GET /api/recipes/<id>/` : détail d’une recette
  - `PUT/PATCH/DELETE /api/recipes/<id>/` : modification / suppression
- Permissions et sécurité :
  - Lecture possible pour tous (recettes publiques via l’API)
  - Création / modification / suppression réservées aux utilisateurs connectés (session Django)
- CORS :
  - `django-cors-headers` configuré pour autoriser les requêtes provenant de `http://localhost:5173` (frontend React).[web:30][web:31]

### Frontend (React + Vite)

- Interface moderne avec thème sombre (dégradé bleu foncé → noir)
- Page principale :
  - Titre : **RecipeShare**
  - Sous-titre : application web transactionnelle – recettes partagées
- Composant `RecipeList` :
  - Chargement des recettes via `fetch` depuis `/api/recipes/`
  - États gérés : chargement, erreur, liste vide
  - Barre de recherche : filtre sur le titre et les ingrédients
  - Filtre “Afficher seulement les recettes publiques”
  - Affichage des recettes sous forme de cartes :
    - Titre
    - Ingrédients
    - Étapes
    - Prix (gratuit ou montant)
    - Statut (Publique / Privée)
    - Date et identifiant de la recette
- Composant `RecipeForm` :
  - Formulaire “Ajouter une recette” (titre, ingrédients, étapes, prix, visibilité)
  - Envoi d’une requête `POST` à `/api/recipes/`
  - Ajout immédiat de la nouvelle recette au début de la liste après succès
  - Nécessite que l’utilisateur soit connecté dans `/admin` (session Django dans le même navigateur)

---

## 6. Scénario de démonstration (pour l’enseignant)

1. **Démarrer les serveurs**
   - Backend (terminal 1) :
     ```
     cd backend
     venv\Scripts\activate
     python manage.py runserver
     ```
   - Frontend (terminal 2) :
     ```
     cd frontend
     npm run dev
     ```

2. **Montrer l’API**
   - Ouvrir `http://127.0.0.1:8000/api/recipes/`
   - Afficher le JSON contenant les recettes (ex. “Test recipe”, “Pizza maison”, etc.).

3. **Montrer l’admin Django**
   - Ouvrir `http://127.0.0.1:8000/admin/`
   - Se connecter avec le superutilisateur créé
   - Aller dans **Recipes → Recipes** et afficher la liste
   - Montrer que les recettes visibles dans l’admin sont les mêmes que celles retournées par l’API.

4. **Montrer le frontend React**
   - Ouvrir `http://localhost:5173/`
   - Présenter :
     - Le thème sombre (bleu/noir)
     - La liste dynamique des recettes (venant de l’API)
     - La recherche et le filtre “Recettes publiques”
   - Utiliser le formulaire **“Ajouter une recette”** :
     - Exemple :
       - Titre : `Pizza maison`
       - Ingrédients : `Pâte à pizza, sauce tomate, mozzarella, basilic`
       - Étapes : `Préparer la pâte, étaler la sauce, ajouter le fromage, cuire au four 15 minutes.`
       - Prix : `12.50`
       - Cocher “Recette publique”
     - Soumettre le formulaire
     - Montrer que la nouvelle carte apparaît immédiatement dans la liste.
   - Retourner dans :
     - `http://127.0.0.1:8000/admin/recipes/recipe/`
     - `http://127.0.0.1:8000/api/recipes/`
     - et montrer que la même recette est bien enregistrée en base de données.

---

## 7. Améliorations possibles

- Authentification côté frontend (login, affichage de “Mes recettes” pour l’utilisateur connecté)
- Validation avancée (règles sur le titre, longueur des textes, plage de prix)
- Filtrage et recherche côté backend (paramètres de requête dans l’API)
- Déploiement sur un environnement en ligne (Render, Railway, etc.)
- Ajout de tests unitaires / d’intégration pour l’API et les composants React
````
