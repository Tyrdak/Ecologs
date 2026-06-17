# Ecologs - Calculateur d'Empreinte Carbone & Impact IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-78.1%25-blue?logo=typescript)](https://www.typescriptlang.org/) 
[![Data: Nos Gestes Climat](https://img.shields.io/badge/Data-Nos%20Gestes%20Climat-informational)](https://github.com/incubateur-ademe/nosgestesclimat/tree/main/data/empreinte)

Ecologs est une application permettant d'estimer l'empreinte carbone annuelle d'un utilisateur en décomposant son bilan personnel (Transports, Logement, Alimentation) et en y intégrant un module d'évaluation de l'impact des usages d'IA (LLMs, génération d'images/vidéos, infrastructure cloud).

## Table des matières 

- [Fonctionnalités principales](#fonctionnalités-principales)

- [Sources & Rigueur](#sources--rigueur)

- [Architecture](#architecture)

- [Stack technique](#stack-technique)

- [Installation & Démarrage local](#installation--démarrage-local)

- [Licence](#licence) 

## Fonctionnalités principales

* **Calculateur de bilan personnel :** Questionnaire adaptatif pour estimer l'impact des Transports, du Logement et de l'Alimentation.

* **Module Impact IA :** Calculateur dédié évaluant le coût carbone, énergétique (kWh) et hydrique (litres d'eau) de l'usage des LLMs, générateurs d'images/vidéos et infrastructures Cloud (GPU).

* **Blog Environnemental :** Espace d'articles documentés et sourcés rédigés par l'équipe, traitant des enjeux climatiques et de la sobriété numérique.

## Sources & Rigueur

L'intégralité du moteur de calcul repose sur des données de référence vérifiables et documentées. Chaque facteur d'émission (FE) utilisé dans l'application est strictement tracé depuis des sources officielles et scientifiques :

* **Bilan Personnel :** Base Empreinte de l'ADEME et modèle de calcul ouvert Nos Gestes Climat.

* **Alimentation :** Base de données Agribalyse (ADEME).

* **Impact IA & Cloud :** AI Impact Calculator, rapports ESG des fournisseurs Cloud (Google, AWS, Azure), et littérature scientifique (notamment les travaux de S. Luccioni - Hugging Face).

## Architecture

L'application est construite autour d'une architecture N-Tier (Clean Architecture) respectant une séparation stricte des responsabilités en couches :

* **Couche Présentation (UI/Routes) :** N'effectue aucun calcul.

* **Couche Domaine / Service :** Contient toute la logique métier et les règles de calcul mathématiques. Indépendante des frameworks d'interface.

* **Couche Persistance (Dépôts/Bases) :** Gère l'accès aux données (facteurs d'émission stockés localement).

## Stack technique

* **Langage :** TypeScript

* **Persistance des données :** Fichiers JSON locaux

## Installation & Démarrage local

Prérequis :

* **Node.js (v18+)**

* **npm, yarn ou pnpm**

Cloner le dépôt :

```bash
git clone -b Core https://github.com/Tyrdak/Ecologs.git
cd Ecologs
```
Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

## Licence

Ce projet est distribué sous la [licence MIT](LICENSE).
