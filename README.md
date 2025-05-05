# How to Start the Project

# "Frontend" folder using CRA build. "FrontendVite" folder uses VITE +REACT latest build --- for my shadcn to work

## Advantages of Vite

- **Faster Startup:** Vite uses native ES modules and only bundles code on demand, so the dev server starts almost instantly, even for large projects.
- **Hot Module Replacement (HMR):** Updates are reflected in the browser instantly as you save files, without a full reload.
- **Modern Build Tools:** Uses Rollup under the hood for optimized production builds and supports modern JavaScript features out of the box.
- **Simpler Configuration:** Easier to configure and extend compared to older tools like Webpack.
- **First-class TypeScript & JSX Support:** Works seamlessly with React, TypeScript, and other modern frameworks.
- **Better DX:** Error overlays, fast refresh, and a more enjoyable developer experience.

## Start the Vite Frontend

```sh
cd frontendvite
npm install
npm run dev
```

## Start the OG CLA Frontend

```sh
cd frontend
npm install
npm start
```

- The app will be available at http://localhost:3000

## Start the Backend

```sh
cd backend
npm install
npm install dotenv
npm run startDev   # enables nodemon (hot reload)
# or
node server.js
```

## Start the Temporary JSON Database for Tables

```sh
cd frontend/src/components/admin-dashboard
npx json-server --watch sample.json --port 8000
# or (from project root)
npx json-server --watch frontend/src/components/admin-dashboard/sample.json --port 8000


# VITE
npx json-server --watch frontendvite/src/components/admin-dashboard/sample.json --port 8000
```

## Login Guide (Hardcoded Accounts)

**Admin Accounts:**

- Email: admin123@gmail.com, Password: password123
- Email: admin@toga.edu, Password: admin2024

**Student Accounts:**

- Email: student1@toga.edu, Password: student123
- Email: student2@toga.edu, Password: student456

---

_Note: Tailwind setup is now improved in the Vite project._
