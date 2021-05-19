## Règles git :

On fait du gitflow, c'est-à-dire : 

- la branche master ne sert que pour les releases

- la branche dévelop est celle sur laquelle on fait les merge

- pour chaque feature on fait une branche feature/"nomdelafeature"

- quand on a fini une feature on fait une merge request sur develop

## Init :
- Copier le fichier application-prod.properties en application-dev.properties
  
- Remplacer les configs avec votre config
  
- Créer 2 tables : une pour le dév et une pour les tests
  
- Mettre à jours vos configs pour quelles utilises ces tables

## Déploiement :

- ng build --prod

- copier le contenu de dist/ProjetTutS4FrontEnd dans main/ressources/public sur le serveur
