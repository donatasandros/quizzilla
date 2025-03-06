import * as React from "react";

import { cn } from "@/lib/utils";

interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: string;
  containerSize?: string;
  mask?: "radial-center" | "radial-down" | "none";
  highlight?: boolean;
}

export function GridPattern({
  className,
  cellSize = "96x96",
  containerSize = "1920x1440",
  mask = "none",
  highlight = false,
  ...props
}: GridPatternProps) {
  const [cellWidth, cellHeight] = cellSize.split("x").map(Number);
  const [containerWidth, containerHeight] = containerSize
    .split("x")
    .map(Number);

  const colCount = Math.floor(containerWidth / cellWidth);
  const rowCount = Math.floor(containerHeight / cellHeight);

  const maskStyles: Record<NonNullable<GridPatternProps["mask"]>, string> = {
    "radial-center":
      "radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0) 100%)",
    "radial-down":
      "radial-gradient(45% 100% at 50% 0%, black 0%, transparent 90%)",
    none: "",
  };

  function generateDeterministicRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Initialize a grid where each cell is either "active" (e.g., highlighted) or not.
  const activeCells: boolean[][] = Array.from({ length: rowCount }, () =>
    Array(colCount).fill(false),
  );

  if (highlight) {
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        // Only activate a cell if no adjacent cells are already active.
        if (
          !activeCells[row][col] &&
          generateDeterministicRandom(row * colCount + col) > 0.8 &&
          !activeCells[row - 1]?.[col] && // Ensure no top neighbor
          !activeCells[row + 1]?.[col] && // Ensure no bottom neighbor
          !activeCells[row]?.[col - 1] && // Ensure no left neighbor
          !activeCells[row]?.[col + 1] // Ensure no right neighbor
        ) {
          activeCells[row][col] = true;
        }
      }
    }
  }

  return (
    <div
      className={cn("grid border-collapse", className)}
      style={{
        gridTemplateColumns: `repeat(${colCount}, ${cellWidth}px)`,
        gridTemplateRows: `repeat(${rowCount}, ${cellHeight}px)`,
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        maskImage: maskStyles[mask],
        WebkitMaskImage: maskStyles[mask],
      }}
      {...props}
    >
      {activeCells.map((row, rowIndex) =>
        row.map((isActive, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "border-t border-l border-gray-200 dark:border-gray-800",
              colIndex === colCount - 1 && "border-r",
              rowIndex === rowCount - 1 && "border-b",
              isActive
                ? "bg-gray-100 dark:bg-gray-800"
                : "bg-white dark:bg-gray-950",
            )}
          />
        )),
      )}
    </div>
  );
}
