import BaseInfo from "./constant";
export const transforBase64 = (file: Blob | File) => {
  return new Promise<string>((res, rej): void => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target!.result;
      res(base64String as string);
    };
    reader.onerror = (e) => {
      rej(e);
    };
    reader.readAsDataURL(file);
  });
};

export const getImgSize = (src: string) => {
  let img = new Image();
  img.crossOrigin = "";
  img.src = src;
  return new Promise<{
    width: number;
    height: number;
  }>((res, _) => {
    img.onload = () => {
      const count = img.width > img.height ? img.width : img.height;
      console.log("debug countt", count);

      let ration = 1;
      if (count >= 1000) {
        ration = 0.4;
      }

      if (count >= 2000) {
        ration = 0.3;
      }
      if (count >= 3000) {
        ration = 0.1;
      }
      const size = {
        width: ration !== 1 ? Math.floor(img.width * ration) : BaseInfo.width,
        height:
          ration !== 1 ? Math.floor(img.height * ration) : BaseInfo.height,
      };
      res(size);
    };
  });
};
