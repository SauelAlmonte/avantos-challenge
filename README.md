# Avantos Journey Builder – React Coding Challenge

This project is a technical implementation of a subset of the Journey Builder application for Avantos. It renders a list of forms based on a live form graph and allows users to configure prefill mappings between upstream and downstream form fields, reflecting dependencies in a directed acyclic graph (DAG).

---

## Tech Stack

- **React.js** – Component-based UI library
- **Vite** – Fast front-end tooling and development server
- **JavaScript (ES6+)** – Application logic
- **CSS** – Component-level styling
- **HTML5** – Structure and layout
- **Fetch API** – Live data integration (no mocks)

---

## Features

- **Live API Integration**  
  Fetches real-time form graph data from a live Avantos API endpoint.

- **Form Rendering in Topological Order**  
  Forms are rendered in a logical sequence based on DAG traversal using Kahn’s algorithm.

- **Dynamic Prefill Configuration**  
  Users can set or update prefill sources for form fields based on direct, transitive, or global data sources.

- **Field Schema Awareness**  
  Only valid and supported field types are displayed and configurable.

- **Visual Field Status Indicators**  
  Each form field clearly shows whether a prefill source is configured or not.

- **Prefill Modal Dialog**  
  A modal interface allows selection of source fields for prefill configuration from upstream forms or global data.

- **Download JSON Snapshot**  
  Exports the currently rendered form graph (with enriched data) as a JSON file.

---

## Project Folder Structure

- `client/` - React frontend application
    - `public/` - Static assets
    - `src/`
        - `components/` - UI components (FormList, FormNode, PrefillModal)
        - `hooks/` - Custom React hooks (e.g., usePrefillConfig)
        - `services/` - API service modules (e.g., fetchGraph, updateFormNode)
        - `utils/` - Utility functions (e.g., DAG traversal)
        - `App.jsx` - Root component
        - `main.jsx` - Vite entry point
        - `App.css` - Global styles
    - `index.html` - HTML entry point
    - `vite.config.js` - Vite configuration

- `server/` - Local mock server to serve form graph data

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

---

### 1. Clone the Repository

```bash

git clone https://github.com/your-username/avantos-challenge.git
cd avantos-challenge

cd client
npm install

cd ../server
npm install

```

### 2. Start the Mock Server
```bash

cd server
npm start

The server will run at http://localhost:3000.
```

### 3. Start the React App
```bash

cd ../client
npm run dev

The client app will be available at http://localhost:5173.
```

---

## License

This project is provided for evaluation purposes as part of a technical coding challenge and is not licensed for commercial use.

All code is the intellectual property of its author and is shared solely for review and demonstration. Redistribution or reuse outside of this context is not permitted without prior written consent.

---

## Disclaimer

This codebase is not affiliated with or endorsed by Avantos.

It was developed independently as part of a candidate technical exercise and should be treated solely as a demonstration of technical capability.

All data is mock or publicly accessible and does not represent any proprietary or sensitive information.
