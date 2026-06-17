# Ecologs - Calculateur d'Empreinte Carbone & Impact IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-78.1%25-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-%20-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

Ecologs est une application permettant d'estimer l'empreinte carbone annuelle d'un utilisateur en décomposant son bilan personnel (Transports, Logement, Alimentation) et en y intégrant un module d'évaluation de l'impact des usages d'IA (LLMs, génération d'images/vidéos, infrastructure cloud).

---

## Table des matières

- [Fonctionnalités principales](#fonctionnalites-principales)
- [Sources & Rigueur](#sources--rigueur)
- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Installation & Démarrage](#installation--demarrage)
- [Déploiement](#deploiement)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## Fonctionnalités principales

- Calculateur de bilan personnel — questionnaire adaptatif pour estimer l'impact des Transports, du Logement et de l'Alimentation.
- Module Impact IA — estimation du coût carbone et de la consommation énergétique liée aux usages d'IA et à l'infrastructure cloud.
- Historique & export — possibilité d'exporter son bilan (CSV/JSON) et de suivre l'évolution dans le temps.
- Paramétrage avancé — personnalisation des facteurs d'émission et profils utilisateurs.

## Sources & Rigueur

Les calculs s'appuient sur des sources publiques et traçables. Exemples :

- ADEME (Nos Gestes Climat, Agribalyse)
- Rapports fournisseurs cloud (Google, AWS, Azure)
- Travaux et estimateurs d'impact IA (articles et outils publics)

Chaque facteur d'émission est versionné et peut être revu pour transparence.

## Architecture

Application organisée en couches (séparation des responsabilités) :

- Présentation (Next.js app/router)
- Domaine / Services (logique métier, calculs)
- Persistance (stockage des facteurs et historiques)

## Stack technique

- Langage : TypeScript
- Framework : Next.js (App Router)
- Déploiement suggéré : Vercel

## Installation & Démarrage

Pré-requis : Node.js v18+ et npm/yarn/pnpm

1. Cloner le dépôt :

```bash
git clone https://github.com/Tyrdak/Ecologs.git
cd Ecologs
# si besoin : récupérer la branche Core
git fetch origin
git switch Core || git checkout -b Core origin/Core
```

2. Installer les dépendances :

```bash
npm install
# ou
# yarn
# pnpm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
# ou
# yarn dev
# pnpm dev
```

Ouvrir http://localhost:3000

## Déploiement

Déployer sur Vercel pour un déploiement Next.js sans configuration lourde, ou tout autre fournisseur compatible.

## Contribuer

Les contributions sont bienvenues :

- Ouvrir une issue pour discuter d'une amélioration ou d'un bug.
- Créer une branche feature/bugfix, ajouter des tests si possible, puis ouvrir une Pull Request.

Respecter la séparation des responsabilités (UI vs logique métier) et documenter les changements.

## Licence

Ce projet est distribué sous la licence MIT. Voir le fichier [LICENSE](LICENSE) pour le texte complet.
