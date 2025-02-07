# Convertisseur de Taux de Change - Banque de France

## 📊 Description

Cette application web permet de convertir des devises en utilisant les taux de change officiels de la Banque de France. Les données sont mises à jour quotidiennement et couvrent plus de 30 devises internationales.

## ✨ Fonctionnalités

- 💱 Conversion en temps réel des devises
- 📅 Sélection de dates (à partir du 1er janvier 2024)
- 🔄 Mise à jour quotidienne automatique des taux
- 📱 Interface responsive et intuitive
- 📋 Copie rapide des résultats dans le presse-papiers

## 🛠️ Technologies Utilisées

- **Frontend:**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui

- **Backend:**
  - Node.js
  - Node-cron (pour les mises à jour automatiques)

## 🚀 Installation

### 1. Clonez le dépôt : (dev)

```bash
git clone https://github.com/aurelien-f/convert-taux-bdf
```

### 2. Installez les dépendances : (dev)

```bash
npm install
```

### 3. Démarrez le serveur : (dev)

```bash
npm run dev
```

## 📦 Scripts Disponibles

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "cron": "node scripts/cron_donwload_cvs.js",
  "convert": "node scripts/convertCSVtoJson.js",
  "extractTitles": "node scripts/extractTitlesCSVtoJson.js"
}
```

## 🔄 Mise à Jour des Données

Les taux de change sont automatiquement mis à jour chaque jour à minuit via une Github Action. Le processus comprend :

1. Téléchargement du fichier CSV depuis la Banque de France
2. Conversion des données en format JSON
3. Stockage des données par date
4. Mise à jour du fichier JSON dans le dépôt GitHub
5. Commit et push des données mises à jour
6. Déploiement des modifications sur Vercel

## 🌐 Structure des Données

Les taux de change sont stockés au format JSON avec la structure suivante :

```json
{
  "Date": "2024-05-23",
  "AUD": 1.6333,
  "USD": 1.0854,
}
```

## 📝 Licence

© 2025 - Tous droits réservés - [Aurélien Feuillard](https://www.aurelien-feuillard.fr)

## 🔗 Sources des Données

Les données utilisées proviennent du site officiel de la [Banque de France](https://www.banque-france.fr/fr/publications-et-statistiques/statistiques?theme%5B7194%5D=7194&sub_theme%5B7205%5D=7205).

---

Pour plus d'informations ou pour signaler un problème, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.
