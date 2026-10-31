# ==========================================
# Stage 1: Build & Lint Application (Node)
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run lint && npm run build

# ==========================================
# Stage 2: Production Web Server (Nginx SPA)
# ==========================================
FROM nginx:stable-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
