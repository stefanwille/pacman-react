export interface Vector {
  x: number;
  y: number;
}

export const rotateVectorBy180Degrees = (vector: Vector): Vector =>
  multiplyVector(-1, vector);

export const multiplyVector = (factor: number, vector: Vector): Vector => ({
  x: factor * vector.x,
  y: factor * vector.y,
});

export const divideVector = (vector: Vector, divisor: number): Vector =>
  multiplyVector(1 / divisor, vector);
