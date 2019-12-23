import React, { FC, useState } from "react";

const ROWS = 31;
const COLUMNS = 28;

export const Grid: FC<{
  x: number;
  y: number;
}> = ({ x, y }) => {
  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  return (
    <div>
      <div
        className={"Grid"}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          transformOrigin: "top left",
          gridTemplateColumns: `repeat(${COLUMNS}, 24px)`,
          gridTemplateRows: `repeat(${ROWS}, 24PX)`
        }}
      >
        {Array(ROWS)
          .fill(null)
          .map((_, rowIndex) =>
            Array(COLUMNS)
              .fill(null)
              .map((_, columnIndex) => (
                <div
                  className="GridCell"
                  key={`${rowIndex}/${columnIndex}`}
                  onMouseEnter={() => setCoordinates([rowIndex, columnIndex])}
                  onMouseLeave={() => setCoordinates(null)}
                ></div>
              ))
          )}
      </div>
      <div
        style={{
          position: "absolute",
          left: `${x + COLUMNS * 24}px`,
          top: `${y + ROWS * 24}px`,
          height: "20px"
        }}
      >
        {coordinates && `${coordinates[0]} / ${coordinates[1]}`}
      </div>
    </div>
  );
};
