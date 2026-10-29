import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname: l } = useLocation();
  return (
    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [l]),
    null
  );
};

export default ScrollToTop;
