# ────────────────────────────────────────────────
# Stage 1 : Build / Dépendances
# ────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copie d'abord les fichiers de dépendances → meilleur caching
COPY package*.json ./
# ou si tu utilises yarn : COPY yarn.lock ./

RUN npm ci --only=production
# ou yarn install --production --frozen-lockfile

# Copie le reste du code
COPY . .

# Si tu as un build (typescript, esbuild, etc.)
# RUN npm run build

# ────────────────────────────────────────────────
# Stage 2 : Image finale – très légère
# ────────────────────────────────────────────────
FROM node:20-alpine AS runner

# Sécurité : on crée un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# On copie uniquement ce qui est nécessaire depuis le builder
COPY --from=builder /app /app

# On change d'utilisateur (très bonne pratique)
USER appuser

# Port que ton app écoute (change si besoin)
EXPOSE 3000

# Variable d'environnement recommandée en prod
ENV NODE_ENV=production

# Commande de démarrage (adapte selon ton projet)
CMD ["node", "index.js"]
# ou : CMD ["node", "dist/server.js"]
# ou si tu utilises ts-node/esm : CMD ["node", "--import=tsx", "src/index.ts"]