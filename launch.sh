#!/usr/bin/env bash
# ==============================================================================
# DecaFleet-OS: Sovereign Server Launch & Deployment Script
# Audience: Natalie & Jay (Founders & Swarm Directors)
# ==============================================================================

set -e

echo "======================================================================"
echo "DECAFLEET-OS // PRODUCTION SERVER LAUNCH SEQUENCE"
echo "Sovereign 10-Bot Swarm Execution Platform & Jev-AI (jev-latest) Gate"
echo "======================================================================"

# 1. Environment & Node check
if ! command -v node &> /dev/null; then
    echo "[FATAL] Node.js is not installed. Please install Node.js v20+ or v22 LTS."
    exit 1
fi

NODE_VER=$(node -v)
echo "[INFO] Detected Node.js: $NODE_VER"

# 2. Initialize environment configuration
if [ ! -f .env ]; then
    echo "[INFO] No .env found. Copying from .env.example..."
    cp .env.example .env
    echo "[NOTICE] Please edit .env if you wish to configure TYPESAFE_API_KEY or port."
else
    echo "[OK] Found existing .env configuration."
fi

# 3. Install dependencies
echo "[INFO] Installing dependencies via npm install..."
npm install

# 4. Pre-flight verification
echo "[INFO] Running unit tests and unit economics verification..."
npm test

# 5. Build frontend production assets
echo "[INFO] Compiling Vite production assets..."
npm run build || true

# 6. Execute Day 1 Sub Radar audit to prime registries
echo "[INFO] Priming Stage 1 Sub Radar 40-sub public sunshine cache..."
npm run audit:sub-radar

# 7. Start DecaFleet-OS
PORT="${PORT:-3000}"
echo "======================================================================"
echo "SERVER READY: Launching DecaFleet-OS on http://0.0.0.0:$PORT"
echo "Command Center UI: http://localhost:$PORT"
echo "To run continuously in background: use 'nohup npm start &' or Docker."
echo "======================================================================"

exec npm start

