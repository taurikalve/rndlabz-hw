# Base
FROM node:22-alpine AS base
ARG PORT=3000

# Builder
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runner
FROM base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/build ./build

EXPOSE $PORT
CMD ["npm", "run", "start"]