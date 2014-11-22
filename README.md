#  WikiContributions II JS

## INF6150 A2014
INF6150 Génie logiciel: conduite de projets informatiques

## Installation
### Cloner le repo
```
git@github.com:nilovna/wikiContributions-js.git
```

### Lancer le projet
Ouvrir le fichier index.html dans un navigateur

## Technologies
Le projet utilise les technologies suivantes:
* __AngularJS__ : Framework Javascript MVC. 
    Permet d'avoir un plus faible couplage la présentation, les données et les composants métiers.
    * [Tutoriel](https://docs.angularjs.org/tutorial)
    * [Tutoriel vidéo](http://www.youtube.com/watch?v=WuiHuZq_cg4&list=PL173F1A311439C05D&context=C48ac877ADvjVQa1PpcFONnl4Q5x8hqvT6tRBTE-m0-Ym47jO3PEE%3D)
    * [Documentation](https://docs.angularjs.org/api)
* __Bootstrap 3__ : Framework CSS.
    * [Documentation](http://getbootstrap.com/)
* __Bower__ : Packet managers pour les libraries, frameworks. Facilite la mise à jours des dépendances.
    * [Site](http://bower.io/)

## Structure du projet
### .bowerrc
Fichier de configuration pour Bower.
Vous ne devriez pas avoir à modifier ce fichier. 

[Documentation](http://bower.io/docs/config/)

### bower.json
Manifest bower du projet. Vous ne devriez pas avoir à modifier ce fichier.

[Documentation](http://bower.io/docs/creating-packages/)

### app/
Contient les fichiers principaux de l'application

#### app/bower_components
Contient les dépendances du projets installées avec bower. (libraries, frameworks, assets, utilities)

Vous ne devriez _jamais_ modifier le contenu de ce dossier.


#### app/app.js
Controleur de l'application

#### app/index.html
Template principal de l'application.


## INF6150 A2013
## Équipe VOGG

Membres de l'équipe

* Victor Bitca
* Olivier Charrier
* Guillaume Lahaie
* Guy Francoeur

## Objectifs

* Une application http://ialex.ca/reconnaissance existait. Nous avons eu comme mandat de la modifier pour y ajouter des fonctionnalités.  Au lieu de cela nous avons opté pour une preuve de concept qui aurait pour but premier : régler un problème d'architecture conceptuelle et de vitesse. 

### Idée

* Il est plus simple et plus rapide d'utiliser les ordinateurs et le navigateur de chaque utilisateur pour faire les calculs et ainsi distribuer la charge au lieu de la garder dans le serveur php.

### Spécifique

* Refaire l'application original php de wikiContributions (GRISOU) en JavaScript, JQuery (Ajax)
* Construire un layout visuel éventuellement adaptable.
* Eliminer les refresh de pages.
* Ajouter le retreive progressif des articles d'un contributeur.
* Ajouter le total score des articles qui sont dans la liste (valeur absolut de size diff).
* Ajouter l'onglet Talk.
* Ajouter la distance d'édition (Levenshtein distance).
* Ajouter la recherche avancée.
* Ajouter des informations sur les contributions:
  * la grosseur en char de l'article.
  * la différence en char entre l'article précédent et ma contribution.
  * Ajouter la date de la contribution dans cet article.

----------------------------------------------------------

# wikiContributions

wikiContributions is a tool to help scientists get recognition for their contributions to scientific wikis. We believe that eventually, scientific wikis will replace the conventional scientific articles published in expensive and non-collaborative magazines. When this will happen, it will be harder for a member of the scientific community to mention what articles he/she has contributed to in his/her resume, since wiki contributions are collaborative and can be anything from a comma to a whole article. We aim to provide a measurement tool for this, and our project is well under way. You can find information about both using wikiContributions and contributing to the project in the wiki help page : https://github.com/GrisouUQAM/wikiContributions/wiki/English. 
The code uses code provided by **Google-Diff, Match and Patch** for revision comparisons (found in the `google-diff` folder).

**If you wish to edit parts of this code, we will gladly add you as a contributor. All you need to do is write a comment in the [issue] (https://github.com/GrisouUQAM/wikiContributions/issues) you are interested in!**

Please note that documentation for this github depository has been inspired by the [CSS Lint page] (https://github.com/stubbornella/csslint), which is truly a model open-source project.

---------------------------------------------------------

# wikiContributions

wikiContributions est un outil visant à aider les scientifiques à obtenir de la reconnaissance pour leurs contributions aux wikis scientifiques. Nous croyons qu'éventuellement, les wikis scientifiques remplaceront les articles conventionnels publiés dans les revues scientifiques dispendieuses et non-collaboratives. Lorsque ce sera le cas, il sera plus difficile pour un membre de la communauté scientifique d'inscrire dans son CV quelles sont les contributions qu'il/elle aura apportées à des articles sur internet, puisque celles-ci sont de nature collaborative, et peuvent aller de la virgule jusqu'à un article de 10 pages complet. Nous souhaitons ainsi fournir un outil de mesure, et notre projet va bon train. Vous pourrez trouver de l'information concernant la façon d'utiliser notre site web ainsi que la façon d'y contribuer sur la page d'aide wiki de notre dépôt:
https://github.com/GrisouUQAM/wikiContributions/wiki/Francais. 
Notre projet utilise le code fourni par **Google-Diff, Match and Patch** pour faire la comparaison de différentes révisions (que vous trouverez dans le dossier `google-diff`).

**Si vous souhaitez modifier des parties de ce code, nous serons heureux de vous ajouter à nos collaborateurs. Vous n'avez qu'à laisser un commentaire dans la [question/problème] (https://github.com/GrisouUQAM/wikiContributions/issues) qui vous intéresse!**

Prenez note que la documentation de ce dépôt github a été inspirée par la page de [CSS Lint] (https://github.com/stubbornella/csslint), qui est un vrai modèle de projet ouvert.

--------------------------------------------------------

## Membres GRISOU

### Initiateurs

* Robert Dupuis
* Anne Goldenberg
* Louise Laforest

### Contributeurs

* Laurence Loiselle Dupuis
* Melanie Lord
* Daniel Memmi
* Normand Seguin
* Nguyen Tho Hau
* Sylvie Trudel

Dernière MAJ : 2014-11-21
