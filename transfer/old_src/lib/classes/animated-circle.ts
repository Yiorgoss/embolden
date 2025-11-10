export type PositionType = {
    direction: { x: number; y: number };
    speed: { x: number; y: number };
    current?: { x: number; y: number };
    bounds: {
        min: { x: number; y: number };
        max: { x: number; y: number };
    };
    initial: { x: number; y: number };
};

export type DimensionsType = {
    direction: number;
    bounds: { max: number; min: number };
    speed: number;
    current: number;
    initial?: number;
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
    circleDOM: HTMLElement;

    skewX = 0;
    skewY = 0;
    scale = 1;

    constructor(initial: ConstructorType) {
        this.dimensions = initial.dimensions;
        this.dimensions.initial = 1;

        this.position = initial.position;
        this.position.current = { x: 0, y: 0 };
        this.ensureWithinBoundary();

        this.circleDOM = initial.circleDomRef;
        this.initCSS(initial.css);
        this.nextFrame();
    }
    ensureWithinBoundary() {
        this.position.initial.x = Math.max(
            this.position.bounds.min.x,
            Math.min(this.position.initial.x, this.position.bounds.max.x),
        );
        this.position.initial.y = Math.max(
            this.position.bounds.min.y,
            Math.min(this.position.initial.y, this.position.bounds.max.y),
        );
    }
    initCSS(cssList: string) {
        const defaultCSS = "opacity-85 rounded-full absolute";
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
        this.nextDimensions();

        // console.log(this.skewX, this.skewY);
        this.circleDOM.style.translate = `${this.skewX}px ${this.skewY}px `;
        this.circleDOM.style.transform = `scale(${this.scale})`;
    }

    nextPosition() {
        if (!this.position) throw Error("Circle Position not initialised");
        const nextSkewX =
            this.skewX + this.position.speed.x * this.position.direction.x;
        const nextSkewY =
            this.skewY + this.position.speed.y * this.position.direction.y;

        if (
            nextSkewX + this.position.initial.x > this.position.bounds.max.x ||
            nextSkewX + this.position.initial.x < this.position.bounds.min.x
        )
            this.position.direction.x *= -1;

        if (
            nextSkewY + this.position.initial.y > this.position.bounds.max.y ||
            nextSkewY + this.position.initial.y < this.position.bounds.min.y
        )
            this.position.direction.y *= -1;

        this.skewX = nextSkewX;
        this.skewY = nextSkewY;
    }
    nextDimensions() {
        if (!this.dimensions) throw Error("Circle Dimensions not initialised");

        if (
            this.scale! > this.dimensions.bounds.max ||
            this.scale! < this.dimensions.bounds.min
        ) {
            this.dimensions.direction *= -1;
        }
        this.scale! += this.dimensions.speed * this.dimensions.direction;
    }
}
// export class AnimatedCircle {
//     position: PositionType;
//     dimensions: DimensionsType;
//     circleDOM: HTMLElement;
//     isPaused: boolean = false;
//
//     constructor(initial: ConstructorType) {
//         this.dimensions = initial.dimensions;
//         this.dimensions.initial = 1;
//         this.dimensions.sizeMultiplier = 1;
//
//         this.position = initial.position;
//         this.position.current = { x: 0, y: 0 };
//         this.ensureWithinBoundary();
//
//         this.circleDOM = initial.circleDomRef;
//         this.initCSS(initial.css);
//         this.nextFrame();
//     }
//
//     ensureWithinBoundary() {
//         this.position.initial.y =
//             this.position.initial.y > this.position.bounds.max.y
//                 ? this.position.bounds.max.y
//                 : this.position.initial.y < this.position.bounds.min.y
//                   ? this.position.bounds.min.y
//                   : this.position.initial.y;
//
//         this.position.initial.x =
//             this.position.initial.x > this.position.bounds.max.x
//                 ? this.position.bounds.max.x
//                 : this.position.initial.x < this.position.bounds.min.x
//                   ? this.position.bounds.min.x
//                   : this.position.initial.x;
//     }
//
//     initCSS(cssList: string) {
//         const defaultCSS = "rounded-full absolute";
//         defaultCSS
//             .split(/\s+/)
//             .forEach((css) => this.circleDOM.classList.add(css));
//         if (!cssList) return;
//         cssList
//             .trim()
//             .split(/\s+/)
//             .forEach((css) => this.circleDOM.classList.add(css));
//
//         this.circleDOM.style.left = `${this.position.initial.x}px`;
//         this.circleDOM.style.top = `${this.position.initial.y}px`;
//         this.circleDOM.style.width = `${this.dimensions.current}px`;
//         this.circleDOM.style.height = `${this.dimensions.current}px`;
//     }
//
//     nextFrame() {
//         this.nextPosition();
//         this.nextDimensions();
//
//         this.circleDOM.style.transform = `translate(${this.position.current.x}px, ${this.position.current.y}px)`;
//         this.circleDOM.style.transform = `scale(${this.dimensions.sizeMultiplier})`;
//     }
//
//     nextPosition() {
//         if (!this.position) throw Error("Circle Position Not Initialised");
//         if (
//             this.position.initial.x - this.position.current.x <
//                 this.position.bounds.min.x ||
//             this.position.initial.x + this.position.current.x >
//                 this.position.bounds.max.x
//         ) {
//             this.position.direction.x *= -1;
//         }
//         if (
//             this.position.initial.y - this.position.current.y <
//                 this.position.bounds.min.y ||
//             this.position.initial.y + this.position.current.y >
//                 this.position.bounds.max.y
//         ) {
//             this.position.direction.y *= -1;
//         }
//
//         this.position.current.x =
//             this.position.current.x +
//             this.position.speed.x * this.position.direction.x;
//         this.position.current.y =
//             this.position.current.y +
//             this.position.speed.y * this.position.direction.y;
//     }
//
// nextDimensions() {
//     if (!this.dimensions) throw Error("Circle Dimensions not initialised");
//
//     if (
//         this.dimensions.sizeMultiplier! > this.dimensions.bounds.max ||
//         this.dimensions.sizeMultiplier! < this.dimensions.bounds.min
//     ) {
//         this.dimensions.direction *= -1;
//     }
//     this.dimensions.sizeMultiplier! +=
//         this.dimensions.speed * this.dimensions.direction;
// }
// }
