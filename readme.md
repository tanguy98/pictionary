# PROJET PICTIONARY
###### Produit par © Tanguy Houette
readme réalisé sur https://dillinger.io/ et grâce à https://commonmark.org/help/tutorial/07-links.html

-------------------
#### Description générale du projet :
Le but du projet est de développer (full stack en JavaScript) un site internet et le server correspondant qui permette à plusieurs utilisateurs de jouer au Pictionary ensemble en ligne.\
Le but du jeu du Pictionary est de faire deviner un mot ou une expression à partir d'un dessin.


---------------------
#### Prérequis techniques :
- Frontend \
-- React (Framework JS) version : \
-- Bootstrap (Framework CSS) \
- Backend \
-- NodeJS (Runtime) : version \
-- Express (API Rest HTTP) \
-- MySQL (Persistance) version : \
-- Sequelize (Accès aux données) \
-- Socket.IO (Communication au temps réel) \

Pour plus d'informations sur les dépendances du projet, vous pouvez vous référrer à la section dependencies des fichiers package.json ( du [frontend](./frontend/package.json) et du [backend](./backend/package.json))

-------------------------------
#### Une description technique succincte  :

Le frontend est une application React. Elle communique en backend avec un server Nodejs Express, via le module de requêtes http axios.
Le server utilise sequelize pour avoir accès à une base de donnée MySQL dans laquelle se trouvent les 3 tables de données (Users, Parties, Words).
La communication en temps réel :
Le server utilise aussi Socket.io pour mettre en place la communication en temps réelle nécessaire pour le jeu.
Le système d'authentification :

-------------------------------
#### Avancement du projet et description des fonctionnalités :

Le site est encore en développement et n'est pas disponible en ligne. Vous pouvez cependant le faire fonctionner locallement sur un PC en suivant les étapes décrites dans les parties suivantes. Le code est disponible sur [github](https://github.com/tanguy98/pictionary/tree/master). La version actuellement fonctionnelle est celle sur la branch master, pendant que je travaille sur la version suivante sur une branche séparée.

Les fonctionnalités disponibles actuellement correspondent à celles des étapes 1 et 2 du cahier des charges :

En arrivant sur le site, l'utilisateur arrive sur un formulaire de cnnexion. S'il se connecte pour le première fois, il peut se créer un compte, puis se connecter.
Une fois connecté, il accède à la page d'accueil du site qui présente une liste de parties en cours que l'utilisateur peut rejoindre. L'utilisateur peut également créer une partie, dont il sera alors le destinateur.

Si l'utilisateur dispose des droits d'administrateurs, il est redirigé à sa connexion vers une page dont les différents onglets lui permettent d'administrer la base des donnée. Il a accès à la liste des mots disponibles (à faire deviner dans le jeu) et peut en ajouter ou en supprimer. Il a également accès à la liste des parties en cours et peut en supprimer.

Le déroulé d'une partie est assez simple. Elle se déroule en 3 manches. Le créateur de la partie, une fois que les autres participants se sont connectés, peut entammer la première manche : il commence à dessiner sur un "tableau" le mot qui lui est imposé. Les autres joueurs voient son dessin en temps réel. Le premier des joueurs supplémentaires propose le mot, si celui-ci correspond, il remporte la manche et marque un point. Les manches s'enchînent ainsi. Le vainqueur est celui qui a le plus de points. A la fin de la partie, les joueurs peuvent relancer la partie, revenir à la page d'accueil ou se déconnecter.

Pour rappel le cahier des charges prévoit :

Prochaines pistes d'amélioration :
- Tests (Etape 4)
- Gestion d'erreur
- Sécurité de l'authentification (utiliser https, les cookies, Json Web Tokens)
- Résilience des données : vérifications des données chargées dans la base de donnée

-------------------------------------
#### Procédure d'installation détaillée :

-----------------------------------
#### Comment précharger les données :

-----------------------------------
#### Description des données préchargées :

Les données préchargées comprennent :
- Des mots
Il s'agit des mots à faire deviner, on en charge une vingtaine qui permettrint d'animer le jeu.

- Des utilisateurs :

L'administrateur :

username : admin
mot de passe : adminpassword

Des joueurs :

username : player1
mot de passe : password1

username : player2
mot de passe : password2

username : player3
mot de passe : password3

username : player4
mot de passe : password4

- Aucune partie en cours : il faut en créer une pour jouer.


--------------------------------------
###### Mise en place de la base de donnée :
Installer MySQL blabla cf doc
Pour créer les bases de données, sur le server exécuter les commandes contenues dans reset database.sql
Dans le back, exécuter les commandes :
>npx sequelize-cli db:migrate \
>npx sequelize-cli db:seed:all \
La première commande crée les tables dans les bases de données.