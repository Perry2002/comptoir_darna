# 🕌 Comptoir Darna — Feuille de Route Projet

> Refonte complète du site web — v1.0 · Juin 2026  
> Stack : React + TypeScript + Vite · TailwindCSS · Framer Motion

---

## ✅ Base de Projet (Livré dans ce ZIP)

Le projet de démarrage est **100% fonctionnel**. Après `npm install && npm run dev` vous avez :

- ✅ 7 pages React complètes et routées
- ✅ Design System "Marrakech Red Heritage" intégré (couleurs, typo, espacement)
- ✅ Navbar sticky + responsive avec menu mobile
- ✅ Footer complet (adresse, horaires, liens)
- ✅ Animations Framer Motion (Hero, scroll reveal, transitions de pages)
- ✅ Galerie avec lightbox full-screen et filtres par catégorie
- ✅ Menu avec filtres par catégorie et animations
- ✅ Page Réservation avec formulaire complet
- ✅ Page Avis avec notation globale, barres de progression et filtres par plat
- ✅ Page Art & Show avec programme des événements
- ✅ Page Contact avec formulaire et carte

---

## 📋 Phase 1 — Contenu Réel & Assets (Semaine 1-2)

### 1.1 Assets à fournir par le client
- [ ] Logo Comptoir Darna en SVG/PNG haute résolution
- [ ] Photos professionnelles du restaurant (minimum 30 photos)
  - Salle principale, patio, bar, scène
  - Plats signature en food photography
  - Ambiance soirée, spectacles
- [ ] Vidéo loopée pour le Hero (format MP4/WebM, 1080p, 20-30 sec)
- [ ] Photos des plats pour le menu (par catégorie)

### 1.2 Contenu textuel à valider
- [ ] Carte du restaurant complète avec prix à jour (DH)
- [ ] Descriptions des plats validées
- [ ] Textes institutionnels (À propos, présentation du lieu)
- [ ] Programme Art & Show exact (dates, artistes)
- [ ] Horaires confirmés

### 1.3 Intégration des assets
- [ ] Remplacer les images Unsplash par les photos réelles dans `src/pages/`
- [ ] Ajouter le logo dans `src/components/layout/Navbar.tsx` et `Footer.tsx`
- [ ] Intégrer la vidéo Hero dans `src/pages/HomePage.tsx` (balise `<video>` en remplacement du `<img>`)
- [ ] Optimiser toutes les images en WebP avec `sharp` ou `imagemin`

---

## 📋 Phase 2 — Backend & Réservations (Semaine 3-5)

### 2.1 Mise en place du backend
- [ ] Initialiser un projet Node.js + Express dans `/backend`
- [ ] Configurer MongoDB Atlas (cluster gratuit ou payant)
- [ ] Définir les modèles Mongoose :
  - `Reservation` (date, heure, couverts, nom, email, téléphone, occasion, statut)
  - `Contact` (nom, email, sujet, message, date)
  - `Review` (nom, note, plat, texte, date, approuvé)

### 2.2 API REST
- [ ] `POST /api/reservations` — Créer une réservation
- [ ] `GET /api/reservations` — Lister (admin)
- [ ] `POST /api/contact` — Envoyer un message
- [ ] `POST /api/reviews` — Soumettre un avis
- [ ] `GET /api/reviews` — Afficher les avis approuvés

### 2.3 Emails transactionnels (Resend)
- [ ] Installer `resend` : `npm install resend`
- [ ] Créer le template email de confirmation client
- [ ] Créer le template email de notification restaurant
- [ ] Connecter `POST /api/reservations` à l'envoi d'email
- [ ] Configurer le domaine d'envoi dans Resend dashboard

### 2.4 Connexion frontend ↔ backend
- [ ] Créer `src/lib/api.ts` avec les fonctions fetch
- [ ] Connecter le formulaire `ReservationPage.tsx` à `POST /api/reservations`
- [ ] Connecter le formulaire `ContactPage.tsx` à `POST /api/contact`
- [ ] Ajouter les messages d'erreur et de succès avec toast notifications

---

## 📋 Phase 3 — Fonctionnalités Avancées (Semaine 5-7)

### 3.1 Intégration Google Maps
- [ ] Obtenir une clé API Google Maps dans Google Cloud Console
- [ ] Installer `@vis.gl/react-google-maps` : `npm install @vis.gl/react-google-maps`
- [ ] Remplacer la carte placeholder dans `ReservationPage` et `ContactPage`
- [ ] Ajouter le marqueur personnalisé Comptoir Darna
- [ ] Configurer l'itinéraire depuis le centre-ville

### 3.2 Avis Google & TripAdvisor (Agrégation)
- [ ] Configurer Google Places API pour récupérer les avis en temps réel
- [ ] Créer un endpoint backend `GET /api/reviews/google` avec cache Redis (ou TTL MongoDB)
- [ ] Mettre à jour `AvisPage.tsx` pour afficher les vrais avis Google
- [ ] Intégrer un widget TripAdvisor (script officiel)

### 3.3 Galerie améliorée
- [ ] Ajouter le upload de photos depuis le back-office admin
- [ ] Configurer Cloudinary pour le stockage et l'optimisation des images
- [ ] Implémenter le lazy loading avec `IntersectionObserver`
- [ ] Ajouter les transitions parallaxe avec Framer Motion sur le scroll

### 3.4 Newsletter
- [ ] Ajouter un formulaire d'inscription dans le Footer
- [ ] Créer `POST /api/newsletter` côté backend
- [ ] Connecter à Mailchimp ou Brevo (ex-Sendinblue) via leur API

---

## 📋 Phase 4 — SEO & Performance (Semaine 8)

### 4.1 SEO On-Page
- [ ] Installer `react-helmet-async` : `npm install react-helmet-async`
- [ ] Ajouter des balises `<title>` et `<meta description>` uniques sur chaque page
- [ ] Implémenter Open Graph (og:title, og:image, og:description) pour le partage social
- [ ] Ajouter Schema.org structuré (Restaurant, Menu, LocalBusiness) dans `index.html`

```html
<!-- Exemple Schema.org à ajouter dans index.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Comptoir Darna",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenue Echouhada",
    "addressLocality": "Marrakech",
    "addressCountry": "MA"
  },
  "telephone": "+212524437702",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "14000"
  }
}
</script>
```

### 4.2 Performance images
- [ ] Migrer toutes les images vers le format WebP
- [ ] Ajouter `loading="lazy"` sur toutes les images hors-fold
- [ ] Configurer les dimensions `width` et `height` sur les images pour éviter le CLS
- [ ] Mettre en place un CDN (Cloudflare ou Vercel Edge Network)

### 4.3 Core Web Vitals
- [ ] Passer Lighthouse sur toutes les pages (cible : score > 90)
- [ ] Corriger le LCP (Largest Contentful Paint) : précharger l'image Hero
- [ ] Corriger le CLS (Cumulative Layout Shift) : fixer les dimensions des images
- [ ] Minifier les bundles JS (déjà fait par Vite en production)

### 4.4 Sitemap & robots.txt
- [ ] Générer `public/sitemap.xml` avec toutes les URLs
- [ ] Créer `public/robots.txt`
- [ ] Soumettre le sitemap à Google Search Console

---

## 📋 Phase 5 — Internationalisation (Semaine 7-8)

### 5.1 Bilingue FR / EN
- [ ] Installer `i18next` et `react-i18next` : `npm install i18next react-i18next`
- [ ] Créer les fichiers de traduction `src/locales/fr.json` et `src/locales/en.json`
- [ ] Ajouter le bouton de bascule FR/EN dans la Navbar
- [ ] Traduire tous les textes statiques
- [ ] Gérer les URLs localisées (`/en/menu`, `/fr/menu`)

---

## 📋 Phase 6 — Administration & CMS (Semaine 9)

### 6.1 Back-office simple (option légère)
- [ ] Créer une route `/admin` protégée par authentification JWT
- [ ] Interface pour valider/refuser les réservations
- [ ] Interface pour modérer les avis clients
- [ ] Interface pour mettre à jour les prix du menu

### 6.2 CMS Sanity (option complète)
- [ ] Initialiser Sanity.io : `npm create sanity@latest`
- [ ] Définir les schemas : `menu`, `events`, `gallery`, `reviews`
- [ ] Connecter les pages React aux données Sanity via `@sanity/client`
- [ ] Former le client à utiliser Sanity Studio

---

## 📋 Phase 7 — Déploiement (Semaine 10)

### 7.1 Frontend (Vercel)
- [ ] Connecter le repo GitHub à Vercel
- [ ] Configurer les variables d'environnement :
  - `VITE_API_URL` → URL du backend
  - `VITE_GOOGLE_MAPS_KEY` → Clé API Google Maps
- [ ] Configurer le domaine personnalisé `comptoirmarrakech.com`
- [ ] Activer HTTPS automatique (Let's Encrypt via Vercel)

### 7.2 Backend (Railway ou Render)
- [ ] Déployer l'API Node.js sur Railway
- [ ] Configurer les variables d'environnement :
  - `MONGODB_URI`
  - `RESEND_API_KEY`
  - `JWT_SECRET`
- [ ] Configurer les CORS pour accepter uniquement le domaine frontend

### 7.3 Recette & Mise en ligne
- [ ] Livrer en environnement staging pour validation client
- [ ] Corriger les retours client (max 5 jours ouvrés)
- [ ] Migration DNS : pointer `comptoirmarrakech.com` vers Vercel
- [ ] Tests cross-browser (Chrome, Safari, Firefox, Edge)
- [ ] Tests mobile (iOS Safari, Android Chrome)
- [ ] Formation du client à l'administration

---

## 🏗️ Structure du Projet

```
comptoir-darna/
├── public/
│   ├── sitemap.xml          # À créer en Phase 4
│   └── robots.txt           # À créer en Phase 4
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx   ✅
│   │   │   └── Footer.tsx   ✅
│   │   └── ui/
│   │       └── ScrollToTop.tsx ✅
│   ├── hooks/
│   │   └── useScrollReveal.ts ✅
│   ├── pages/
│   │   ├── HomePage.tsx     ✅
│   │   ├── MenuPage.tsx     ✅
│   │   ├── ReservationPage.tsx ✅
│   │   ├── GalleriePage.tsx ✅
│   │   ├── AvisPage.tsx     ✅
│   │   ├── ArtShowPage.tsx  ✅
│   │   └── ContactPage.tsx  ✅
│   ├── App.tsx              ✅
│   ├── main.tsx             ✅
│   └── index.css            ✅
├── tailwind.config.js       ✅
├── index.html               ✅
└── package.json             ✅
```

---

## 🚀 Démarrage Rapide

```bash
# 1. Décompresser le zip
unzip comptoir-darna.zip
cd comptoir-darna

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
# → http://localhost:5173

# 4. Build de production
npm run build
```

---

## 📦 Dépendances Principales

| Package | Version | Usage |
|---|---|---|
| react | ^19 | Framework UI |
| react-router-dom | ^7 | Routing |
| framer-motion | ^12 | Animations |
| tailwindcss | ^3 | Styling |
| lucide-react | ^0.507 | Icônes |
| typescript | ^5 | Typage |

---

*Comptoir Darna © 2026 — Document confidentiel*
