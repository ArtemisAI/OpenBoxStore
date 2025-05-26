 # Use official Node.js LTS image
 FROM node:18-alpine
 
 # Create app directory
 WORKDIR /app
 
 # Install dependencies
 COPY package.json package-lock.json* ./
# NPM ci installs from package-lock.json and is generally faster and more reliable for builds.
# Ensure devDependencies are installed as they are needed for the build.
RUN npm ci
 
 # Copy tsconfig and source code
COPY tsconfig.json ./
COPY src ./src
 
 # Build the TypeScript application
RUN npm run build
 
 # Prune devDependencies for a smaller image
RUN npm prune --production
 
 # The CMD should remain the same, as "npm start" will execute "node dist/index.js"
 CMD ["npm", "start"]