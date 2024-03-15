import { Particle } from "./Particle";
import module from "./constant";
import { CanvasSizeProps, RenderMode } from "./types";
const { animateTime } = module;
/** Logo图片类 */
export class LogoImg<T = CanvasRenderingContext2D> {
  // 图片链接
  src: string;
  // 图片名称
  name: string;
  // 图片转换后的粒子
  particleData: Particle<T>[]; // 用于保存筛选后的粒子
  // 渲染上下文
  context: T;
  // 画布尺寸
  canvasSize: CanvasSizeProps;
  // 当前渲染模式
  renderMode: RenderMode;

  constructor(
    src: string,
    name: string,
    context: T,
    canvasSize?: CanvasSizeProps,
    renderMode = RenderMode.canvas,
  ) {
    this.renderMode = renderMode;
    this.canvasSize = canvasSize || {
      width: 700,
      height: 700,
    };
    this.context = context;
    this.src = src;
    this.name = name;
    this.particleData = [];
  }
  async init() {
    let img = new Image();
    img.crossOrigin = "";
    img.src = this.src;
    return new Promise((res, _) => {
      // canvas 解析数据源获取粒子数据
      img.onload = () => {
        // 获取图片像素数据
        const tmp_canvas = document.createElement("canvas"); // 创建一个空的canvas
        const tmp_ctx = tmp_canvas.getContext("2d");
        const imgW = this.canvasSize.width;
        const imgH = this.canvasSize.height;
        tmp_canvas.width = imgW;
        tmp_canvas.height = imgH;
        tmp_ctx?.drawImage(img, 0, 0, imgW, imgH); // 将图片绘制到canvas中
        const imgData = tmp_ctx?.getImageData(0, 0, imgW, imgH).data; // 获取像素点数据

        tmp_ctx?.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);

        // 筛选像素点
        for (let y = 0; y < imgH; y += 5) {
          for (let x = 0; x < imgW; x += 5) {
            // 像素点的序号
            const index = (x + y * imgW) * 4;
            // 在数组中对应的值
            const r = imgData![index];
            const g = imgData![index + 1];
            const b = imgData![index + 2];
            const a = imgData![index + 3];
            const sum = r + g + b + a;
            // 筛选条件
            if (sum >= 100) {
              const particle = new Particle(
                x,
                y,
                animateTime,
                [r, g, b, a],
                this.context,
                this.canvasSize,
              );
              this.particleData.push(particle);
            }
          }
        }
        res(true);
      };
    });
  }
}
