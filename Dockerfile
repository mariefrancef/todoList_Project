# Utiliser l'image officielle Node.js comme image de base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
# RUN npm install
RUN npm ci
# `npm ci` est plus rapide et plus fiable que `npm install` pour les environnements CI/CD


# Copier tous les fichiers de l'application dans le conteneur
COPY . .

# Construire l'application (les fichiers statiques)
RUN npm run build

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "./dist/server.js"]


# docker create network todo_network
# docker build -t img_todolist .
# docker run -d -p 3000:3000 --network todo_network --name cont_todolist img_todolist