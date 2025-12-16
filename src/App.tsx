import { useRef, useState } from "react";
import Grid from "./components/Grid";

const GRID_SIZE = 25;

enum CellType {
  Empty = 0,
  Filled = 1,
  Obstacle = 2,
}

enum FloodFillAlgorithm {
  DFS = 0,
  BFS = 1,
}

function App() {
  const [grid, setGrid] = useState<CellType[][]>(
    Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill(CellType.Empty)
    )
  );
  const [algorithm, setAlgorithm] = useState<FloodFillAlgorithm>(
    FloodFillAlgorithm.BFS
  );
  const [isFilling, setIsFilling] = useState(false);
  const shouldStop = useRef(false);
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const isValid = (row: number, col: number, visited: boolean[][]) =>
    row >= 0 &&
    row < GRID_SIZE &&
    col >= 0 &&
    col < GRID_SIZE &&
    !visited[row][col] &&
    grid[row][col] === CellType.Empty;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const stopFill = () => {
    shouldStop.current = true;
    setIsFilling(false);
  };
  console.log("Current algorithm: ", algorithm);
  const floodFillBFS = async (startRow: number, startCol: number) => {
    const queue: [number, number][] = [[startRow, startCol]];
    const visited = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(false));
    visited[startRow][startCol] = true;

    while (queue.length > 0) {
      if (shouldStop.current) break;
      const [row, col] = queue.shift()!;

      // Fill current cell with animation delay
      setGrid((prev) => {
        const newGrid = prev.map((r) => [...r]);
        newGrid[row][col] = CellType.Filled;
        return newGrid;
      });

      await delay(30);

      for (const [dr, dc] of directions) {
        const nr = dr + row;
        const nc = dc + col;
        if (isValid(nr, nc, visited)) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  };

  const floodFillDFS = async (
    row: number,
    col: number,
    visited: boolean[][]
  ) => {
    if (shouldStop.current) return;
    //Mark and fill current cell
    visited[row][col] = true;
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[row][col] = CellType.Filled;
      return newGrid;
    });

    await delay(30);

    for (const [dr, dc] of directions) {
      const nr = dr + row;
      const nc = dc + col;

      if (isValid(nr, nc, visited)) {
        await floodFillDFS(nr, nc, visited);
      }
    }
  };

  const handleCellClick = async (row: number, col: number) => {
    if (isFilling || grid[row][col] !== CellType.Empty) return;

    setIsFilling(true);
    shouldStop.current = false;

    const visited = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill(false)
    );

    if (algorithm === FloodFillAlgorithm.BFS) await floodFillBFS(row, col);
    else await floodFillDFS(row, col, visited);

    if (!shouldStop.current) {
      setIsFilling(false);
    }
  };

  const addObstacle = (row: number, col: number) => {
    if (grid[row][col] === CellType.Empty && !isFilling) {
      setGrid((prev) => {
        const newGrid = prev.map((r) => [...r]);
        newGrid[row][col] = CellType.Obstacle;
        return newGrid;
      });
    }
  };

  const resetGrid = () => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(CellType.Empty))
    );
    setIsFilling(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "sans-serif"
      }}
    >
      <h1>Flood Fill Visualizer (BFS vs DFS)</h1>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) =>
            setAlgorithm(Number(e.target.value) as FloodFillAlgorithm)
          }
          disabled={isFilling}
        >
          <option value={FloodFillAlgorithm.BFS}>BFS (Breadth-First)</option>
          <option value={FloodFillAlgorithm.DFS}>DFS (Depth-First)</option>
        </select>
        <button
          onClick={resetGrid}
          style={{ marginLeft: "20px", padding: "8px 16px" }}
        >
          Reset Grid
        </button>
        {isFilling && (
          <button
            onClick={stopFill}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Stop Fill
          </button>
        )}
      </div>
      <p>
        <em>
          Left-click an empty cell to start flood fill • Right-click to place
          obstacles
        </em>
      </p>
      <Grid
        grid={grid}
        onCellClick={handleCellClick}
        addObstacle={addObstacle}
      />
    </div>
  );
}

export default App;
