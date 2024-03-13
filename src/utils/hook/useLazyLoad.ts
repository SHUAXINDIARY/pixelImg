import { useState, useRef, useEffect } from "react";

const useLazyLoad = (imageSrc: string, placeholderSrc: string) => {
  const [imageSrcState, setImageSrc] = useState(placeholderSrc);
  const imageRef = useRef(null);

  useEffect(() => {
    // 创建IntersectionObserver实例并配置回调函数
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // 当图片进入可视区域时，替换图片源
        setImageSrc(imageSrc);
        // 停止观察
        observer.unobserve(imageRef.current!);
      }
    });

    // 观察ref所指向的元素
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // 清理函数：组件卸载时取消观察
    return () => observer.disconnect();
  }, [imageSrc, placeholderSrc]);

  return [imageSrcState, imageRef];
};

export default useLazyLoad;
