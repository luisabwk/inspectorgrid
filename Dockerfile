# Build stage
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL

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
