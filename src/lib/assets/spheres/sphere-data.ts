import sphere1 from "$lib/assets/spheres/sphere-1.png";
import sphere2 from "$lib/assets/spheres/sphere-2.png";
import sphere3 from "$lib/assets/spheres/sphere-3.png";
import sphere4 from "$lib/assets/spheres/sphere-4.png";

export const getCircleData = (bb: DOMRect) => {
  return [
    {
      position: {
        speed: { x: 0.02, y: 0.02 },
        initial: { x: 200, y: 200 },
        direction: { x: -1, y: -1 },
        bounds: {
          min: { x: 0, y: 0 },
          max: { x: bb.width, y: bb.height },
        },
      },
      dimensions: {
        current: 100,
        bounds: { min: 0.8, max: 1.4 },
        direction: 1,
        speed: 0.0001,
      },
      css: ``,
      image: sphere4,
    },
    {
      position: {
        speed: { x: 0.05, y: 0.02 },
        initial: { x: 100, y: 700 },
        direction: { x: -1, y: 1 },
        bounds: {
          min: { x: 0, y: 0 },
          max: { x: bb.width, y: bb.height },
        },
      },
      dimensions: {
        current: 100,
        bounds: { min: 0.7, max: 1.3 },
        direction: -1,
        speed: 0.0004,
      },
      css: ``,
      image: sphere2,
    },
    {
      position: {
        speed: { x: 0.03, y: 0.08 },
        initial: { x: 1000, y: 0 },
        direction: { x: 1, y: -1 },
        bounds: {
          min: { x: 0, y: 0 },
          max: { x: bb.width, y: bb.height },
        },
      },
      dimensions: {
        current: 130,
        bounds: { min: 1, max: 1.3 },
        direction: 1,
        speed: 0.0003,
      },
      css: ``,
      image: sphere3,
    },
    {
      position: {
        speed: { x: 0.05, y: 0.01 },
        initial: { x: 1100, y: 400 },
        direction: { x: -1, y: -1 },
        bounds: {
          min: { x: 0, y: 0 },
          max: { x: bb.width, y: bb.height },
        },
      },
      dimensions: {
        current: 180,
        bounds: { min: 1, max: 1.5 },
        direction: 1,
        speed: 0.001,
      },
      css: ``,
      image: sphere1,
    },
  ];
};
