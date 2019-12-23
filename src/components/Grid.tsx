import React, { FC } from "react";

const ROWS = 16;
const COLUMNS = 14;

export const Grid: FC<{
  x: number;
  y: number;
}> = ({ x, y }) => {
  return (
    <div
      className={"Grid"}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transformOrigin: "top left",
        gridTemplateColumns: `repeat(${COLUMNS}, 48px)`,
        gridTemplateRows: `repeat(${ROWS}, 48PX)`
      }}
    >
      {Array(ROWS)
        .fill(null)
        .map((_, rowIndex) =>
          Array(COLUMNS)
            .fill(null)
            .map((_, columnIndex) => (
              <div className="GridCell" key={`${rowIndex}/${columnIndex}`}>
                {rowIndex} / {columnIndex}
              </div>
            ))
        )}
    </div>
  );
};
