# Flood Fill Visualizer

A small interactive visualization of flood fill algorithms (BFS vs DFS) built with React, TypeScript, and Vite.

This project demonstrates how breadth-first search (BFS) and depth-first search (DFS) explore a 2D grid and fill reachable cells while respecting obstacles. It's intended as a teaching / demo app and a starting point for experimenting with grid algorithms and visualizations.

## Demo

- Left-click any empty cell to start flood fill from that cell.
- Right-click (or right-click-and-drag) to place obstacles that block the fill.
- Use the Algorithm selector to switch between BFS and DFS.
- Use Reset Grid to clear the board, and Stop Fill to stop an ongoing animation.

## Features

- Interactive grid visualization (click to start, right-click to add obstacles)
- Two flood-fill algorithms: BFS (level-by-level) and DFS (recursive depth-first)
- Animated fill with a small delay so you can watch how each algorithm explores
- Drag-to-draw obstacles using the right mouse button

## Project structure (key files)

- `src/App.tsx` — main app, grid state, algorithm implementations, UI controls
- `src/components/Grid.tsx` — presentational grid component and mouse handling
- `index.html`, `vite.config.ts` — Vite + app bootstrap

Implementation notes:

- Grid size is set by the `GRID_SIZE` constant in `src/App.tsx` (default: 25).
- Cell types are represented by the `CellType` enum in `src/App.tsx` (Empty, Filled, Obstacle).
- BFS uses a queue and marks visited cells. DFS uses an async recursive function to animate the exploration.

## Getting started (local development)

Prerequisites:

- Node.js (LTS recommended) and a package manager (npm, yarn, or pnpm)

Install dependencies and run the dev server:

```bash
# from project root
npm install
npm run dev
```

Then open the address Vite prints (usually `http://localhost:5173`) in your browser.

Build for production:

```bash
npm run build
# optional preview of production build
npm run preview
```

## Controls / Usage

- Left-click an empty cell to start a flood fill from that cell.
- Right-click a cell to toggle/place an obstacle. Hold and drag with the right mouse button to draw obstacles.
- While a fill is running, the Algorithm selector is disabled. You can stop the fill using the Stop Fill button.

Notes on mouse behavior:

- The grid component prevents the browser context menu on right-click so right-click can be used to draw obstacles.

## Customization

- To change the grid dimensions, edit `GRID_SIZE` in `src/App.tsx`.
- To change the animation speed, adjust the `delay(…)` call in `src/App.tsx` (default delay ~30ms).

## Tests

No automated tests are included by default. If you add logic you want to validate, consider adding Jest/React Testing Library tests and a small CI workflow.

## Contributing

Contributions are welcome. For small changes:

1. Fork the repo
2. Create a new branch for your change
3. Open a pull request with a brief description of the change

If you add features that change user-facing behavior, include an update to this README with usage notes.

## License

This project is provided under the MIT License.
