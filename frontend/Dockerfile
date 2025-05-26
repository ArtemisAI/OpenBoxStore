# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy configuration files
COPY package.json ./
# Copy package-lock.json if it exists
COPY package-lock.json* ./
COPY next.config.js ./
COPY tsconfig.json ./

# Install dependencies
# Using npm ci if package-lock.json exists is generally recommended for reproducible builds
# However, falling back to npm install if it doesn't.
# Add --legacy-peer-deps if there are peer dependency issues with latest Next.js/React versions.
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

# Copy the rest of the source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package.json and package-lock.json (if it exists) to install only production dependencies
COPY package.json ./
COPY package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --production --legacy-peer-deps; else npm install --production --legacy-peer-deps; fi

# Copy necessary files from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Expose port 3000 (Next.js default port)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
