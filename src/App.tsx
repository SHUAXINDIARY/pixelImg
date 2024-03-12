import React, { useState } from "react";
import ImgList from "./components/ImgList";

const Button = {
  border: "none",
  padding: "10px",
  cursor: "pointer",
} as React.CSSProperties;

function App() {
  const [show, setShow] = useState(false);
  const [selectImg, setSelectImg] = useState<{ url: string; label: string }>();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>afd</div>
      <button
        onClick={() => setShow((old) => !old)}
        style={{
          ...Button,
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        {show ? "关闭" : "选择图片"}
      </button>
      <ImgList
        selectImg={selectImg}
        isVisible={show}
        onClose={() => setShow(false)}
        callBack={(item) => {
          setSelectImg(item);
        }}
      />
    </div>
  );
}

export default App;
