FROM node:22-alpine

WORKDIR /app

# Install curl for health check
RUN apk add --no-cache curl bash

# Copy package manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source tree and assets
COPY . .

# Build Vite frontend assets
RUN npm run build

# Expose default port
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Healthcheck monitoring Bot Health API
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:3000/api/bot-health || exit 1

CMD ["npm", "start"]

