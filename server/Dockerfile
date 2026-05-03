FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json /app/package-lock.json* ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/drizzle ./drizzle

EXPOSE 8080
CMD ["sh", "-c", "node dist/db/migrate.js && node dist/index.js"]
