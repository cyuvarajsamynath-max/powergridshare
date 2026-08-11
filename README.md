# GridShare

GridShare is a React single-page application built with Vite, styled with Tailwind CSS, and routed with React Router. This README covers everything needed to set up, develop, build, and deploy the project.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Linting](#linting)
- [Building for Production](#building-for-production)
- [Previewing a Production Build](#previewing-a-production-build)
- [Routing](#routing)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

| Category        | Technology                              |
|------------------|------------------------------------------|
| UI Library       | [React 19](https://react.dev/)           |
| Build Tool       | [Vite 7](https://vite.dev/)              |
| Routing          | [React Router 6](https://reactrouter.com/) |
| Styling          | [Tailwind CSS](https://tailwindcss.com/) (via `@tailwindcss/vite`) |
| Linting          | [ESLint 9](https://eslint.org/) with flat config, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Language         | JavaScript (JSX)                         |

This project uses Vite's official React plugin (`@vitejs/plugin-react`) for Fast Refresh during development, powered by Babel.

---

## Project Structure

```
gridshare-react/
├── public/                 # Static assets served as-is
├── src/
│   ├── main.jsx             # Application entry point
│   └── ...                  # Components, pages, routes, styles
├── index.html                # HTML entry point (mounts #root)
├── vite.config.js            # Vite configuration (React + Tailwind plugins)
├── eslint.config.js           # Flat ESLint configuration
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (v20+ recommended)
- npm (bundled with Node.js), or an alternative package manager such as pnpm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd gridshare-react
npm install
```

### Environment Variables

If the project requires environment-specific configuration, create a `.env` file in the project root (a `.gitignore` entry already excludes it from version control). Vite exposes variables prefixed with `VITE_` to client-side code:

```bash
VITE_API_BASE_URL=https://api.example.com
```

Access these in code via `import.meta.env.VITE_API_BASE_URL`.

---

## Available Scripts

| Command           | Description                                      |
|--------------------|--------------------------------------------------|
| `npm run dev`      | Starts the Vite development server with HMR      |
| `npm run build`    | Builds the app for production into `dist/`       |
| `npm run lint`     | Runs ESLint across the project                   |
| `npm run preview`  | Serves the production build locally for testing  |

---

## Development

Start the local dev server:

```bash
npm run dev
```

By default, Vite serves the app at `http://localhost:5173`. The dev server supports Hot Module Replacement (HMR), so changes to components are reflected instantly without a full page reload.

---

## Linting

This project uses ESLint's flat config format (`eslint.config.js`) along with:

- `js.configs.recommended` — baseline recommended JavaScript rules
- `reactHooks.configs.flat.recommended` — enforces the Rules of Hooks
- `reactRefresh.configs.vite` — ensures components remain compatible with Fast Refresh
- A custom rule ignoring unused variables that start with an uppercase letter or underscore (e.g. constants, unused component imports)

Run the linter with:

```bash
npm run lint
```

> **Note:** This template does not include TypeScript. For a production application, consider migrating to TypeScript with type-aware linting — see the [official Vite React-TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) and [`typescript-eslint`](https://typescript-eslint.io) for guidance.

---

## Building for Production

Generate an optimized production build:

```bash
npm run build
```

The output is written to the `dist/` directory, ready to be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, S3/CloudFront, etc.).

---

## Previewing a Production Build

To sanity-check the production build locally before deploying:

```bash
npm run build
npm run preview
```

This serves the contents of `dist/` on a local server, closely mimicking production behavior.

---

## Routing

Client-side routing is handled by `react-router-dom`. Routes are typically defined in `src/main.jsx` or a dedicated router file using `<BrowserRouter>`, `<Routes>`, and `<Route>` components. Update or add routes there as new pages are introduced.

---

## Styling

Styling is handled with **Tailwind CSS**, integrated directly through the `@tailwindcss/vite` plugin (configured in `vite.config.js`). This enables utility-first styling with zero additional PostCSS configuration. Tailwind's utility classes can be used directly in JSX `className` props throughout the app.

---

## Contributing

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Make your changes and ensure linting passes:
   ```bash
   npm run lint
   ```
3. Commit your changes with a clear message and open a pull request.

---

## License

This project's license has not yet been specified. Add a `LICENSE` file and update this section accordingly (e.g., MIT, Apache-2.0).
