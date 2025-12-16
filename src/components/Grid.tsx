import React, { useState } from "react";

type GridProps = {
  grid: number[][];
  onCellClick: (row: number, col: number) => void;
  addObstacle: (row: number, col: number) => void;
};

const Grid: React.FC<GridProps> = ({ grid, onCellClick, addObstacle }) => {
  const [isRightMouseDown, setIsRightMouseDown] = useState(false);

  const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    if (e.button === 2) {
      e.preventDefault(); // prevent context menu
      setIsRightMouseDown(true);
      addObstacle(row, col);
    } else if (e.button === 0) {
      onCellClick(row, col);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isRightMouseDown) {
      addObstacle(row, col);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button === 2) {
      setIsRightMouseDown(false);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, 25px)`,
        gap: "1px",
        margin: "20px auto",
        justifyContent: "center",
      }}
      onMouseUp={handleMouseUp}
    >
      {grid.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx)}
            onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
            onContextMenu={(e) => e.preventDefault()} 
            style={{
              width: 25,
              height: 25,
              backgroundColor:
                cell === 1 ? "#4f46e5" : cell === 2 ? "#1f2937" : "#ffffff",
              border: "1px solid #9ca3af",
              cursor: "pointer",
            }}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
