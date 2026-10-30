# Project Management App

A React application for organising projects behind a signed-in dashboard. The interface includes account registration, login, project creation, individual project pages, and an online-users panel.

[Live demo](https://business-management-app-ee53c.web.app/)

## Features

- Account registration, sign-in, and sign-out
- Dashboard and project creation pages
- Individual project routes at `/projects/:id`
- Authentication-aware navigation and redirects
- Firebase-backed document and collection hooks
- Shared authentication state through React Context

## Technology

React, JavaScript, React Router, Create React App, CSS, and Firebase (Authentication and Cloud Firestore). The repository also includes Firebase Hosting, Firestore, and Storage configuration files.

## Local development

```bash
git clone https://github.com/ymk-coder-star/project-management-app.git
cd project-management-app
npm install
```

The hooks import a local Firebase configuration module at `src/firebase/config`. That module is not included in the checked-in source and must be supplied for a local build. Configure your own Firebase project to match the imports used throughout the authentication and data hooks; do not use production credentials or commit private keys. Configure Authentication, Firestore, and Storage as required by those hooks, and review the included rules before deploying.

Once the Firebase configuration is in place:

```bash
npm start
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Run the development server |
| `npm test` | Launch the Create React App test runner |
| `npm run build` | Generate the production build in `build/` |

## Source layout

- `src/pages` — dashboard, project creation, project details, login, and signup
- `src/components` — shared navigation, sidebar, and online-users interface
- `src/context` — shared application state
- `src/hooks` — authentication and Firestore access
- `src/assets` — interface assets

This is a portfolio project. The live demo depends on the availability and configuration of its Firebase services.
