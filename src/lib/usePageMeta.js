import { useEffect } from "react";

export const usePageMeta = (l, i, s) => {
  const u = absoluteUrl(s);
  useEffect(() => {
    document.title = l;
    let d = document.querySelector('meta[name="description"]');
    d ||
      ((d = document.createElement("meta")),
      d.setAttribute("name", "description"),
      document.head.appendChild(d)),
      d.setAttribute("content", i);
    let f = document.querySelector('link[rel="canonical"]');
    f ||
      ((f = document.createElement("link")),
      f.setAttribute("rel", "canonical"),
      document.head.appendChild(f)),
      f.setAttribute("href", u);
  }, [l, i, u]);
};

export default usePageMeta;

export const absoluteUrl = (l) =>
  `${typeof window < "u" ? window.location.origin : "https://thehimachaliway.com"}${l}`;
