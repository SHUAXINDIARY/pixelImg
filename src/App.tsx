import { useCallback, useEffect, useRef, useState } from "react";
import ImgList from "./components/ImgList";
import { ParticleCanvas } from "./utils/ParticleCanvas";
import { LogoImg } from "./utils/LogoImg";
import BaseInfo from "./utils/constant";
import styles from "./App.module.css";
import BaseComponents from "./components/BaseComponents.module.css";
import { getImgSize, transforBase64 } from "./utils";
import Upload from "./components/Upload";

function App() {
  // 控制图片选择模板
  const [show, setShow] = useState(false);
  // 当前选择图片
  const [selectImg, setSelectImg] = useState<LogoImg | null>(null);
  // 画布
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 上下文
  let canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
  // 粒子画布实例
  let ParticleCanvasInstance = useRef<ParticleCanvas | null>(null);
  // 画布尺寸
  const [canvasSize, setCanvasSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: BaseInfo.width,
    height: BaseInfo.height,
  });
  // 初始化
  useEffect(() => {
    if (canvasRef?.current) {
      canvasCtx.current = canvasRef?.current?.getContext("2d")!;
      ParticleCanvasInstance.current = new ParticleCanvas(
        canvasRef.current,
        canvasCtx.current,
        {
          width: canvasSize.width,
          height: canvasSize.height,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (canvasRef?.current) {
      canvasCtx.current = canvasRef?.current?.getContext("2d")!;
      ParticleCanvasInstance.current = new ParticleCanvas(
        canvasRef.current,
        canvasCtx.current,
        {
          width: canvasSize.width,
          height: canvasSize.height,
        }
      );
    }
  }, [canvasSize]);

  // 选中图片在canvas里渲染
  useEffect(() => {
    if (selectImg) {
      ParticleCanvasInstance?.current?.changeImg(selectImg);
      ParticleCanvasInstance?.current?.drawCanvas();
    }
  }, [selectImg, canvasSize]);

  const changeImg = async (item: { url: string; label: string }) => {
    const size = await getImgSize(item.url);
    const logImg = new LogoImg(item?.url, item?.label, canvasCtx.current, size);
    await logImg.init();
    setCanvasSize((_) => size);
    setTimeout(() => {
      item?.url && item?.label && setSelectImg((_) => logImg);
    }, 100);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
      onClick={() => {
        show && setShow(false);
      }}
    >
      <div>
        <canvas
          // key={selectImg?.src}
          // 仅有图片需要绘制的时候才展示
          className={selectImg?.src && styles.canvas}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => setShow((old) => !old)}
          className={BaseComponents.Button}
        >
          示例图片
        </button>
        <Upload
          callback={async (e) => {
            const file = e!.target.files?.[0];
            const data = await transforBase64(file!);
            file &&
              data &&
              changeImg({
                label: file?.name!,
                url: data as string,
              });
          }}
        />
      </div>
      <ImgList
        selectImg={{
          url: selectImg?.src!,
          label: selectImg?.name!,
        }}
        isVisible={show}
        onClickImg={(item) => {
          item && changeImg(item);
        }}
      />
    </div>
  );
}

export default App;
