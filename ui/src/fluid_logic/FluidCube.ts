import { FluidCubeInterface, Vector } from "./FluidCube.interface";

class FluidCube implements FluidCubeInterface {
  size: number;
  dt: number;
  diff: number;
  visc: number;
  s: number[][];
  density: number[][];
  v: Vector[][];
  v0: Vector[][];

  constructor(size: number, diff: number, visc: number, dt: number) {
    this.size = size;
    this.diff = diff;
    this.visc = visc;
    this.dt = dt;
    this.s = [];
    this.density = [];
    this.v = [];
    this.v0 = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.s[i][j] = 0;
        this.density[i][j] = 0;
        this.v[i][j] = new Vector(0, 0);
        this.v0[i][j] = new Vector(0, 0);
      }
    }
  }
  addDensity(location: Vector, amount: number) {
    this.density[location.x][location.y] += amount;
  }
  addVelocity(location: Vector, v: number) {
    let vec = this.v0[location.x][location.y];
    vec.add(location);
    this.v0[location.x][location.y] = vec;
  }
  diffuse(b: number, x: Vector[][], x0: Vector[][]) {
    const a = this.dt * this.diff * (this.size - 2) * (this.size - 2);
  }
  set_boundry(b: number, x: Vector[][]) {
    for (let i = 1; i < this.size; i++) {
      const corner1 = x[i][1];
      const corner2 = x[i][this.size - 1];
      x[i][0] =
        b === 2 ? corner1.getNegate() : new Vector(corner1.x, corner1.y);
      x[i][this.size - 1] =
        b === 1 ? corner2.getNegate() : new Vector(corner2.x, corner2.y);
    }
    x[0][0] = x[1][0].getAdd(x[0][1]).getLinearMul(0.5);
    x[0][this.size - 1] = x[1][this.size - 1]
      .getAdd(x[0][this.size - 2])
      .getLinearMul(0.5);
    x[this.size - 1][0] = x[this.size - 2][0]
      .getAdd(x[this.size - 2][1])
      .getLinearMul(0.5);
    x[this.size - 1][this.size - 1] = x[this.size - 2][this.size - 1]
      .getAdd(x[this.size - 1][this.size - 2])
      .getLinearMul(0.5);
  }
}
