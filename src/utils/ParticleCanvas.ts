import module from "./constant";
import { LogoImg } from "./LogoImg";
import { Particle } from "./Particle";
import { CanvasSizeProps, RenderMode } from "./types";
const { animateTime } = module;
// 画布类
export class ParticleCanvas<T = CanvasRenderingContext2D> {
  canvasEle: HTMLCanvasElement;
  ctx: T;
  width: number;
  height: number;
  ParticleArr: Particle<T>[];
  mouseX?: number; // 鼠标X轴位置
  mouseY?: number; // 鼠标Y轴位置
  context: T;
  canvasSize: Partial<CanvasSizeProps> = {};
  renderMode: RenderMode;
  constructor(
    target: HTMLCanvasElement,
    context: T,
    canvasSize: {
      width?: number;
      height?: number;
    },
    renderMode = RenderMode.canvas,
  ) {
    this.renderMode = renderMode;
    this.context = context;
    // 设置画布 获取画布上下文
    this.canvasEle = target;
    this.ctx = target.getContext("2d") as T;
    this.width = target.width;
    this.height = target.height;
    this.ParticleArr = [];
    // 监听鼠标移动
    this.canvasEle.addEventListener("mousemove", (e) => {
      const { left, top } = this.canvasEle.getBoundingClientRect();
      const { clientX, clientY } = e;
      this.mouseX = clientX - left;
      this.mouseY = clientY - top;
    });
    this.canvasEle.onmouseleave = () => {
      this.mouseX = 0;
      this.mouseY = 0;
    };
    this.canvasSize = canvasSize;
  }
  // 改变图片 如果已存在图片则根据情况额外操作
  changeImg(img: LogoImg) {
    const sizeInfo = {
      width: this.canvasSize.width!,
      height: this.canvasSize.height!,
    };
    if (this.ParticleArr.length) {
      // 获取新旧两个粒子数组与它们的长度
      let newPrtArr = img.particleData;
      let newLen = newPrtArr.length;
      let arr = this.ParticleArr;
      let oldLen = arr.length;

      // 调用change修改已存在粒子
      for (let idx = 0; idx < newLen; idx++) {
        const { totalX, totalY, color } = newPrtArr[idx];
        if (arr[idx]) {
          // 找到已存在的粒子 调用change 接收新粒子的属性
          arr[idx].change(totalX, totalY, color);
        } else {
          // 新粒子数组较大 生成缺少的粒子
          arr[idx] = new Particle(
            totalX,
            totalY,
            animateTime,
            color,
            this.context,
            sizeInfo,
          );
        }
      }

      // 新粒子数组较小 删除多余的粒子
      if (newLen < oldLen) this.ParticleArr = arr.splice(0, newLen);
      arr = this.ParticleArr;
      let tmp_len = arr.length;
      // 随机打乱粒子最终对应的位置 使切换效果更自然
      while (tmp_len) {
        // 随机的一个粒子 与 倒序的一个粒子
        // 快速取整
        let randomIdx = ~~(Math.random() * tmp_len--);
        let randomPrt = arr[randomIdx];
        let { totalX: tx, totalY: ty, color } = randomPrt;

        // 交换目标位置与颜色
        randomPrt.totalX = arr[tmp_len].totalX;
        randomPrt.totalY = arr[tmp_len].totalY;
        randomPrt.color = arr[tmp_len].color;
        arr[tmp_len].totalX = tx;
        arr[tmp_len].totalY = ty;
        arr[tmp_len].color = color;
      }
    } else {
      this.ParticleArr = img.particleData.map(
        (item) =>
          new Particle(
            item.totalX,
            item.totalY,
            animateTime,
            item.color,
            this.context,
            sizeInfo,
          ),
      );
    }
  }
  drawCanvas() {
    if (this.renderMode === RenderMode.canvas) {
      (this.ctx as CanvasRenderingContext2D).clearRect(
        0,
        0,
        this.width,
        this.height,
      );
      this.ParticleArr.forEach((particle) => {
        particle.update(this.mouseX, this.mouseY);
        particle.draw();
      });
    }
    window.requestAnimationFrame(() => this.drawCanvas());
  }
}
