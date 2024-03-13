import { ImgHTMLAttributes } from "react";
import useLazyLoad from "../../utils/hook/useLazyLoad";

export default function LazyImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [src, imageRef] = useLazyLoad(props.src!, "");
  return <img {...props} ref={imageRef} src={src as string} />;
}
