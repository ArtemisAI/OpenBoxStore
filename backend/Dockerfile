 # Use official Node.js LTS image
 FROM node:18-alpine
 
 # Create app directory
 WORKDIR /app
 
 # Install dependencies
 COPY package.json package-lock.json* ./
 RUN npm install
 
 # Copy source code
 COPY . .
 
 # TODO: Adjust build steps if using TypeScript or Medusa
 CMD ["npm", "start"]