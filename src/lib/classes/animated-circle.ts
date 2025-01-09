export type PositionType = {
  direction: { x: number; y: number };
  speed: { x: number; y: number };
  bounds: {
    min: { x: number; y: number };
    max: { x: number; y: number };
  };
  current: { x: number; y: number };
};

export type DimensionsType = {
  direction: number;
  bounds: { max: number; min: number };
  speed: number;
  current: number;
};

export type ConstructorType = {
  position: PositionType;
  dimensions: DimensionsType;
  css: string;
  circleDomRef: HTMLElement;
};
export class AnimatedCircle {
  position: PositionType;
  dimensions: DimensionsType;
  frameID: number | null = null;
  circleDOM: HTMLElement;
  isPaused: boolean = false;
  frameRenderMod = 2;
  frameCount = 0;

  constructor(initial: ConstructorType) {
    this.dimensions = initial.dimensions;
    this.position = initial.position;
    this.ensureWithinBoundary();

    this.circleDOM = initial.circleDomRef;
    this.initCSS(initial.css);
    this.nextFrame();
  }

  ensureWithinBoundary() {
    this.dimensions.current =
      this.dimensions.current > this.dimensions.bounds.max
        ? this.dimensions.bounds.max
        : this.dimensions.current < this.dimensions.bounds.min
          ? this.dimensions.bounds.min
          : this.dimensions.current;

    this.position.current.y =
      this.position.current.y > this.position.bounds.max.y
        ? this.position.bounds.max.y
        : this.position.current.y < this.position.bounds.min.y
          ? this.position.bounds.min.y
          : this.position.current.y;

    this.position.current.x =
      this.position.current.x > this.position.bounds.max.x
        ? this.position.bounds.max.x
        : this.position.current.x < this.position.bounds.min.x
          ? this.position.bounds.min.x
          : this.position.current.x;
  }

  initCSS(cssList: string) {
    const defaultCSS = "rounded-full absolute";
    defaultCSS
      .split(/\s+/)
      .forEach((css) => this.circleDOM.classList.add(css));
    if (!cssList) return;
    cssList
      .trim()
      .split(/\s+/)
      .forEach((css) => this.circleDOM.classList.add(css));
  }

  nextFrame() {
    this.nextPosition();
    // this.nextDimensions();

    if (this.frameCount % this.frameRenderMod != 0) return;

    this.circleDOM.style.left = `${this.position.current.x}px`;
    this.circleDOM.style.top = `${this.position.current.y}px`;
    this.circleDOM.style.width = `${this.dimensions.current}px`;
    this.circleDOM.style.height = `${this.dimensions.current}px`;
  }

  nextPosition() {
    if (!this.position) throw Error("Circle Position Not Initialised");
    if (
      this.position.current.x < this.position.bounds.min.x ||
      this.position.current.x > this.position.bounds.max.x
    ) {
      this.position.direction.x *= -1;
    }
    if (
      this.position.current.y < this.position.bounds.min.y ||
      this.position.current.y > this.position.bounds.max.y
    ) {
      this.position.direction.y *= -1;
    }

    this.position.current.x =
      this.position.current.x +
      this.position.speed.x * this.position.direction.x;
    this.position.current.y =
      this.position.current.y +
      this.position.speed.y * this.position.direction.y;
  }

  nextDimensions() {
    if (!this.dimensions) throw Error("Circle Dimensions not initialised");

    if (
      this.dimensions.current > this.dimensions.bounds.max ||
      this.dimensions.current < this.dimensions.bounds.min
    ) {
      this.dimensions.direction *= -1;
    }

    this.dimensions.current =
      this.dimensions.current +
      this.dimensions.speed * this.dimensions.direction;
  }
}
