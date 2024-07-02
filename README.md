# Formation Intégrateur Web, Open-Classroom. Projet 11. "Argent Bank"

## Contexte

> Dans ce projet, vous travaillerez sur le développement front-end d’une application bancaire en utilisant React et Redux pour créer une expérience utilisateur dynamique et réactive.
>
> Votre mission principale sera d'intégrer le front-end avec le back-end via des appels API.
Vous écrirez des appels à l'API REST pour connecter les deux parties de l'application, assurant une communication fluide entre le client et le serveur.
Vous utiliserez React pour développer l'interface utilisateur de l'application bancaire, en vous concentrant sur la création d'un tableau de bord complet et responsive pour les utilisateurs.
>
>Redux sera utilisé pour gérer les données de l'application. Cela vous permettra de maintenir un état global cohérent à travers l'application.
>
>Pour définir les points d'accès de l'API et modéliser les interactions avec les données des transactions, vous utiliserez Swagger. Cet outil vous aidera à décrire les différentes routes et actions nécessaires pour l'API.
>
>Vous utiliserez Node.js pour exécuter le code JavaScript côté serveur. Cela vous donnera une expérience pratique de la gestion d'une application full-stack. 

## Objectifs pédagogiques

* Configurer des routes API pour la communication client / serveur
* Implémenter la gestion des données avec Redux pour assurer le fonctionnement du front
* Afficher les données du back end sur l'interface via des appels API

## Readme du repo original :
````Argent Bank API

This codebase contains the code needed to run the backend for Argent Bank.
Getting Started
Prerequisites

Argent Bank uses the following tech stack:

    Node.js v12
    MongoDB Community Server

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

# Check Node.js version
node --version

# Check Mongo version
mongo --version

Instructions

    Fork this repo
    Clone the repo onto your computer
    Open a terminal window in the cloned project
    Run the following commands:

# Install dependencies
npm install

# Start local dev server
npm run dev:server

# Populate database with two users
npm run populate-db

Your server should now be running at http://locahost:3001 and you will now have two users in your MongoDB database!
Populated Database Data

Once you run the populate-db script, you should have two users in your database:
Tony Stark

    First Name: Tony
    Last Name: Stark
    Email: tony@stark.com
    Password: password123

Steve Rogers

    First Name: Steve,
    Last Name: Rogers,
    Email: steve@rogers.com,
    Password: password456

API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs
Design Assets

Static HTML and CSS has been created for most of the site and is located in: /designs.

For some of the dynamic features, like toggling user editing, there is a mock-up for it in /designs/wireframes/edit-user-name.png.

And for the API model that you will be proposing for transactitons, the wireframe can be found in /designs/wireframes/transactions.png.
