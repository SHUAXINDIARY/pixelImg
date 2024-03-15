export interface CanvasSizeProps {
  width: number;
  height: number;
}

export interface ImgInfoProps {
  url: string;
  label: string;
}

export enum RenderMode {
  canvas = 1,
  pixiJs = 2,
  skia = 3,
}
