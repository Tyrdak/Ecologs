# Ecologs - Calculateur d'Empreinte Carbone & Impact IA

Ecologs est une application qui permet d'estimer l'empreinte carbone annuelle d'un utilisateur, en décomposant son bilan personnel (Transports, Logement, Alimentation) et en y intégrant un module consacré à l'estimation du surcoût carbone lié à l'usage quotidien de l'Intelligence Artificielle.

## Table des matières

* **Fonctionnalités Principales**

Rigueur & Sources des Données

Architecture N-Tier

Stack Technique

Installation & Déploiement

Licence

## Fonctionnalités Principales

* **Calculateur de Bilan Personnel :** Questionnaire adaptatif estimant l'impact du Transport, du Logement et de l'Alimentation.

* **Module Impact IA :** Calculateur dédié évaluant le coût carbone, énergétique (kWh) et hydrique (litres d'eau) de l'usage des LLMs, générateurs d'images/vidéos et infrastructures Cloud (GPU).

## Rigueur & Sources des Données

L'intégralité du moteur de calcul repose sur des données de référence vérifiables et documentées. Chaque facteur d'émission (FE) utilisé dans l'application est strictement tracé depuis des sources officielles et scientifiques :

* **Bilan Personnel :** Base Empreinte de l'ADEME et modèle de calcul ouvert Nos Gestes Climat.

* **Alimentation :** Base de données Agribalyse (ADEME).

* **Impact IA & Cloud :** AI Impact Calculator, rapports ESG des fournisseurs Cloud (Google, AWS, Azure), et littérature scientifique (notamment les travaux de S. Luccioni - Hugging Face).

## Architecture N-Tier (Clean Architecture)

Le projet respecte une séparation stricte des responsabilités en couches :

* **Couche Présentation (UI/Routes) :** N'effectue aucun calcul.

* **Couche Domaine / Service :** Contient toute la logique métier et les règles de calcul mathématiques. Indépendante des frameworks d'interface.

* **Couche Persistance (Dépôts/Bases) :** Gère l'accès aux données (Facteurs d'émission, historique utilisateur).

## Stack Technique

* **Langage :** TypeScript

* **Framework Frontend :** 

* **Persistance des données :** JSON

* **Déploiement :** 

# Installation & Déploiement

## Prérequis

* **Node.js (v18+)**

* **npm ou yarn ou pnpm**

## Lancement en local

Cloner le dépôt :

```bash
git clone -b Core [https://github.com/Tyrdak/Ecologs.git](https://github.com/Tyrdak/Ecologs.git)
cd Ecologs
```

Installer les dépendances :

```bash
npm install
``` 

Démarrer le serveur de développement :

```bash
npm run dev
```

Ouvrir le navigateur sur http://localhost:3000

## Licence

Ce projet est sous licence MIT.
