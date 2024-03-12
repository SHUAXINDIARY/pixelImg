import React, { useEffect, useRef, useState } from "react";
import AnimeJS from "animejs";
import styles from "./index.module.css";
interface ImgListProps {
  isVisible?: boolean;
  onClose?: () => void;
  callBack?: (item?: { url: string; label: string }) => void;
  selectImg?: { url: string; label: string };
}

export default function ImgList(props: ImgListProps) {
  const { isVisible = false, onClose, callBack, selectImg } = props;
  const PanelRef = useRef<any>();
  const [imgListData, _] = useState<{ url: string; label: string }[]>([
    {
      label: "one",
      url: "src/assets/japan.jpg",
    },
    {
      label: "one",
      url: "src/assets/logo_kazimierz.png",
    },
    {
      label: "one",
      url: "src/assets/logo_rhine.png",
    },
  ]);
  //   const [selectImg, setSelectImg] = useState<{ url: string; label: string }>();
  useEffect(() => {
    AnimeJS({
      targets: PanelRef?.current,
      left: isVisible ? "0" : "-200px",
    } as AnimeJS.AnimeParams & React.CSSProperties);
  }, [isVisible]);
  return (
    <div
      ref={PanelRef}
      onClick={() => onClose?.()}
      style={{
        cursor: "pointer",
        height: "100%",
        width: "200px",
        backgroundColor: "#000",
        position: "absolute",
        left: -200 + "px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {imgListData.map((item) => {
        return (
          <img
            onClick={() => {
              //   setSelectImg(item);
              callBack?.(item);
            }}
            className={styles.img}
            key={item.label}
            src={item.url}
            alt={item.label}
            style={
              item.url === selectImg?.url
                ? {
                    width: "80%",
                    margin: "20px 0",
                    borderRadius: "3px",
                    border: "5px solid #a6a4a4",
                  }
                : {
                    width: "80%",
                    margin: "20px 0",
                  }
            }
          />
        );
      })}
    </div>
  );
}
