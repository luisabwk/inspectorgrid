# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage - lightweight static server
FROM node:20-alpine
WORKDIR /app

RUN npm install -g serve@14

COPY --from=build /app/dist ./dist

EXPOSE ${PORT:-4173}

# -s flag enables SPA mode (all routes -> index.html)
CMD ["sh", "-c", "serve dist -s -l ${PORT:-4173}"]
