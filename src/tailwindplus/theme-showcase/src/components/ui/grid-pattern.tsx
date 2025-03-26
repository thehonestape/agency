import React from 'react';

interface GridPatternProps {
  width: number;
  height: number;
  x: number;
  y: number;
  squares: number[][];
  className?: string;
}

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  className,
}: GridPatternProps) {
  let patternId = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && squares.map(([x, y], index) => (
        <rect
          key={index}
          width={1}
          height={1}
          x={x}
          y={y}
          strokeWidth={0}
        />
      ))}
    </svg>
  );
} 