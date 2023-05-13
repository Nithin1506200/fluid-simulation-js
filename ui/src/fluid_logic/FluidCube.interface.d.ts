export interface FluidCubeInterface {
  size: number;
  dt: number;
  diff: number;
  visc: number;
  s: number[][];
  density: number[][];
  v: Vector[][];
  v0: Vector[][];
  addDensity: (location: Vector, amount: number) => void;
}

export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(v: Vector): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  subtract(v: Vector): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  negate(v: Vector): this {
    this.x *= -1;
    this.y *= -1;
  }
  getNegate(): Vector {
    return new Vector(-this.x, -this.y);
  }
  getAdd(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  getsub(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  linearMul(a: number): this {
    this.x *= a;
    this.y *= a;
    return this;
  }
  getLinearMul(a: number): Vector {
    return new Vector(this.x * a, this.y * a);
  }
}
