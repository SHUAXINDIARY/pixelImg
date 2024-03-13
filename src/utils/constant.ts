// 设置画布大小
const width = 700,
  height = 600;

// 设置粒子动画时长
const animateTime = 30;
const opacityStep = 1 / animateTime;

/** 中心影响的半径 */
const Radius = 40;
/** 排斥/吸引 力度 */
const Inten = 0.95;

const GAP_VAL = 3;

export default { 
  width,
  height,
  animateTime,
  opacityStep,
  Radius,
  Inten,
  GAP_VAL,
};
