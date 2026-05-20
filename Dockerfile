FROM node:22-alpine AS deps
WORKDIR /app
ENV DATABASE_URL=postgresql://agentfactory:agentfactory_password@postgres:5432/agentfactory?schema=public
RUN apk add --no-cache openssl
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV DATABASE_URL=postgresql://agentfactory:agentfactory_password@postgres:5432/agentfactory?schema=public
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3010
ENV HOSTNAME=0.0.0.0
RUN apk add --no-cache openssl
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/worker ./worker
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
RUN mkdir -p /app/storage
EXPOSE 3010
CMD ["node", "server.js"]
