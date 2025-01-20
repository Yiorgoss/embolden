export const getCircleData = (bb: DOMRect) => {
  return [
    {
      position: {
        speed: { x: 0.02, y: 0.02 },
        initial: { x: 400, y: 200 },
        direction: { x: 1, y: 1 },
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
      css: `bg-gradient-to-br from-[#d082fa] to-[#e37a42]`,
    },
    {
      position: {
        speed: { x: 0.05, y: 0.02 },
        initial: { x: 1000, y: 600 },
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
      css: ` bg-gradient-to-br from-[#ffd2f0] to-[#92c7d8]`,
    },
    {
      position: {
        speed: { x: 0.03, y: 0.08 },
        initial: { x: 800, y: 0 },
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
      css: ` bg-gradient-to-br from-[#f9f2e5] to-[#9dd99b]`,
    },
    {
      position: {
        speed: { x: 0.05, y: 0.01 },
        initial: { x: 500, y: 600 },
        direction: { x: -1, y: -1 },
        bounds: {
          min: { x: 0, y: 0 },
          max: { x: bb.width, y: bb.height },
        },
      },
      dimensions: {
        current: 200,
        bounds: { min: 1, max: 1.5 },
        direction: 1,
        speed: 0.001,
      },
      css: `bg-gradient-to-br from-[#f9f2e5] to-[#9dd99b]`,
    },
  ];
};
