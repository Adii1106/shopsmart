# ShopSmart LocalLoop 🛍️

A hyperlocal artisan marketplace bridging the gap between master makers and conscious patrons. Support your neighborhood's heritage through a curated collection of handcrafted pottery, textiles, and more.

## 🚀 Features
- **Artisan Marketplace**: Discover unique local products.
- **Robust Authentication**: Secure portal for users and artisans.
- **Automated Workflows**: Full CI/CD pipeline via GitHub Actions.
- **E2E Testing**: Comprehensive coverage with Playwright.
- **DevOps Ready**: Automated EC2 deployment and idempotent setup scripts.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS.
- **Backend**: Node.js, Express.
- **Testing**: Vitest (Client), Jest/Supertest (Server), Playwright (E2E).
- **Deployment**: AWS EC2, GitHub Actions, Render.

## 📦 Getting Started
1. Clone the repo.
2. Run `npm install` in both `/client` and `/server`.
3. Use `npm run dev` to start the development environment.
4. Run `server/setup.sh` for an idempotent backend initialization.
