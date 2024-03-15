import { Application, Assets, Sprite, Graphics } from "pixi.js";
import { useEffect } from "react";
import { LogoImg } from "./utils/LogoImg";
import { RenderMode } from "./utils/types";

const addRect = (app: Application) => {
  const graphics = new Graphics();
  graphics.beginFill(0xff0000); // 使用红色填充
  graphics.drawRect(0, 0, 200, 100); // 绘制矩形，参数分别为x, y, width, height

  // 结束填充
  graphics.endFill();

  // 将图形对象添加到舞台上
  app.stage.addChild(graphics);
};

const TestApp = () => {
  const app = new Application();
  let bunny: Sprite;
  const addImg = async (app: Application) => {
    const logo = new LogoImg<Application>(
      "/assets/logo_rhodes.png",
      "logo",
      app,
      {
        width: 500,
        height: 500,
      },
      RenderMode.pixiJs,
    );
    console.log("调试logo", logo);

    const texture = await Assets.load("/assets/logo_rhodes.png");

    bunny = new Sprite(texture);
    bunny.anchor.set(0.5);

    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    app.stage.addChild(bunny);
  };
  const animateFun = (time: any) => {
    bunny.rotation += 0.1 * time.deltaTime;
  };
  const addAnimate = (app: Application, status: boolean) => {
    if (status) {
      app.ticker.add(animateFun);
    } else {
      app.ticker.remove(animateFun);
    }
  };
  const init = async () => {
    await app.init({
      background: "#000",
      width: 500,
      height: 500,
    });
    document.querySelector("#dom")?.appendChild(app.canvas);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div
          id="dom"
          style={{
            overflow: "hidden",
            width: "500px",
            height: "500px",
            border: "1px solid #000",
          }}
        />
        <button onClick={() => addImg(app)}>添加logo</button>
        <button onClick={() => addAnimate(app, true)}>添加动画</button>
        <button onClick={() => addAnimate(app, false)}>停止动画</button>
        <button onClick={() => addRect(app)}>绘制矩形</button>
      </div>
    </div>
  );
};

export default TestApp;
