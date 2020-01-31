# PROJET PICTIONARY

##### Produit par © Tanguy Houette

-------------------
#### Description générale du projet :
Le but du projet est de développer (full stack en JavaScript) un site internet et le server correspondant qui permette à plusieurs utilisateurs de jouer au Pictionary ensemble en ligne.\
Le but du jeu du Pictionary est de faire deviner un mot ou une expression à partir d'un dessin.


---------------------
#### Prérequis techniques :
Le site et le serveur ont été développés sur Windows 10, où sont installés :
- NodeJS : version v12.1.0
- MySQL : version v8.0.18 for Win64 on x86_64

-------------------------------
#### Une description technique succincte  :

Le projet est composé :
- d'un frontend avec une application React (v.16.12.0)
- d'un backend avec un server Express (v4.17.1)
- d'une base de données MySQL (v8.0.18)

Le frontend utilise le framework CSS Bootstrap.
Le frontend et le backend communiquent via le module de requêtes http axios. \
Le server utilise le module sequelize pour accéder à la DB MySQL. \
La gestion de droits des utilisateurs est effectuée avec le module Json Web Tokens. Les tokens sont stockés localement. Les mots de passes des utilisateurs sont encodés avec bcrypt. \
Le server utilise aussi Socket.io pour mettre en place la communication en temps réelle nécessaire pour le jeu. \

URL de application React : http://localhost:3000 \
URL du server : http://localhost:8080 \

Pour plus d'informations sur les dépendances du projet, vous pouvez vous référrer à la section dependencies des fichiers package.json ( du [frontend](./frontend/package.json) et du [backend](./backend/package.json))

-------------------------------
#### Avancement du projet et description des fonctionnalités :

Le site est encore en phase de développement et n'est pas disponible en ligne. Vous pouvez cependant le faire fonctionner locallement sur un PC en suivant les étapes décrites dans les parties suivantes. Le code est disponible sur [github](https://github.com/tanguy98/pictionary/tree/master). La version actuellement fonctionnelle est celle sur la branch master, pendant que les améliorations sur lesquelles je travaille se trouvent sur une branche séparée.

En arrivant sur le site, l'utilisateur arrive sur un formulaire de connexion. S'il se connecte pour le première fois, il peut se créer un compte, puis se connecter.
Une fois connecté, il accède à la page d'accueil du site qui présente une liste de parties en cours que l'utilisateur peut rejoindre. L'utilisateur peut également créer une partie, dont il sera alors le destinateur.

Si l'utilisateur dispose des droits d'administrateurs, il est redirigé à sa connexion vers une page dont les différents onglets lui permettent d'administrer la base des donnée. Il a accès à la liste des mots disponibles (à faire deviner dans le jeu) et peut en ajouter ou en supprimer. Il a également accès à la liste des parties en cours et peut en supprimer.

Déroulé d'une partie : \
Les parties sont encore rudimentaires
Elle se déroule en 3 manches. Le créateur de la partie, une fois que les autres participants se sont connectés, peut entammer la première manche : il commence à dessiner sur un "tableau" le mot qui lui est imposé. Les autres joueurs voient son dessin en temps réel. Le premier des joueurs supplémentaires propose le mot, si celui-ci correspond, il remporte la manche et marque un point. Les manches s'enchînent ainsi. Le vainqueur est celui qui a le plus de points. A la fin de la partie, les joueurs peuvent relancer la partie, revenir à la page d'accueil ou se déconnecter.

Pistes d'amélioration du projet :

- Complexifier le déroulement d'une partie (calcul du score prenant en compte le temps de réponse, affichage des scores)
- Gestion d'erreur et des status dans les requêtes http entre le front et le back
- Sécurité de l'authentification (utiliser https, le protected routing...)
- Résilience des données : vérification plus stricte des données chargées dans la base de donnée

-------------------------------------
#### Procédure d'installation détaillée :

- Cloner le repository github sur son ordinateur.
- Dans les dossiers frontend et le backend, installer les packages nodes dont dépendent le projet en exécutant la commande :
> npm install
- Création de la base de donnée et gestion d'accès : dans une console MySQL, exécuter les commandes contenues dans [reset-db.sql](./reset-db.sql) (à la racine du projet). Elles crées trois bases de données (développement, test et production), et un utilisateur MySQL qui dispose des droits nécessaires sur ces DB.
- Dans le dossier du back exécuter :

> sequelize:db migrate

Cette commande crée les tables users, words et partie.

> sequelize:db seed:all

Cette commande précharge les données dans la base de donnée.

-----------------------------------
#### Description des données préchargées :

Les données préchargées comprennent :
- Des mots
Il s'agit des mots à faire deviner, on en charge une vingtaine qui permettront d'animer le jeu.

- Des utilisateurs :

L'administrateur :

>**username** : admin
**mot de passe** : adminpassword

Des joueurs :

>**username** : player1
**mot de passe** : password1

>**username** : player2
**mot de passe** : password2

>**username** : player3
**mot de passe** : password3

>**username** : player4
**mot de passe** : password4

Aucune partie en cours : il faut en créer une pour jouer.

-------------------------------
#### Liens utiles :

Repository Github : https://github.com/tanguy98/pictionary/tree/master
