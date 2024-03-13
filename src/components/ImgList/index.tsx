import React, { useEffect, useRef, useState } from "react";
import AnimeJS from "animejs";
import styles from "./index.module.css";
import LazyImg from "../LazyImg";
interface ImgListProps {
  isVisible?: boolean;
  onClose?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickImg?: (item?: { url: string; label: string }) => void;
  selectImg?: { url: string; label: string };
}

export default function ImgList(props: ImgListProps) {
  const { isVisible = false, onClose, onClickImg, selectImg } = props;
  const PanelRef = useRef<any>();
  const [imgListData, _] = useState<{ url: string; label: string }[]>([
    {
      label: "rhodes",
      url: "/assets/logo_rhodes.png",
    },
    {
      label: "two",
      url: "/assets/logo_kazimierz.png",
    },
    {
      label: "three",
      url: "/assets/logo_rhine.png",
    },
  ]);
  useEffect(() => {
    AnimeJS({
      targets: PanelRef?.current,
      left: isVisible ? "0" : "-200px",
    } as AnimeJS.AnimeParams & React.CSSProperties);
  }, [isVisible]);
  return (
    <div
      ref={PanelRef}
      onClick={(e) => {
        onClose?.(e);
        e.stopPropagation();
      }}
      style={{
        cursor: "pointer",
        height: "95%",
        borderRadius: "30px",
        width: "200px",
        backgroundColor: "#000",
        position: "absolute",
        zIndex: 999,
        left: "-200px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow:
          "0 20px 40px 1px rgba(0,0,0,.12),inset 0 -10px 20px -5px rgba(0,0,0,.3),0 150px 100px -80px rgba(0,0,0,.4),inset 0 1px 4px hsla(0,0%,100%,.6),inset 0 -1px 1px 1px rgba(0,0,0,.2)",
      }}
    >
      {imgListData.map((item) => {
        return (
          // <img
          <LazyImg
            onClick={() => {
              onClickImg?.(item);
            }}
            className={styles.img}
            key={item.label}
            src={item.url}
            alt={item.label}
            style={
              item.url === selectImg?.url
                ? {
                    width: "60%",
                    margin: "20px 0",
                    borderRadius: "3px",
                    border: "5px solid #fff",
                  }
                : {
                    width: "60%",
                    margin: "20px 0",
                  }
            }
          />
        );
      })}
    </div>
  );
}
