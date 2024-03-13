import { useRef } from "react";
import BaseComponents from "../BaseComponents.module.css";
export default function Upload(props: {
  callback?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<any>(null);
  return (
    <div
      className={BaseComponents.Input}
      onClick={() => {
        inputRef.current!.click?.();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        id="fileInput"
        name="file"
        onChange={(e) => {
          props.callback?.(e);
        }}
      />
      <button className={BaseComponents.Button}>点击上传</button>
    </div>
  );
}
