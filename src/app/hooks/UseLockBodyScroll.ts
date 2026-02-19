import { useLayoutEffect } from "react";
const UseLockBodyScroll = (locked: boolean) => {
  useLayoutEffect(() => {
    if (!locked) return;
    const scrollY = window.scrollY;
    // Freeze body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      const y = -parseInt(document.body.style.top || "0");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, y);
    };
  }, [locked]);
};

export default UseLockBodyScroll;
