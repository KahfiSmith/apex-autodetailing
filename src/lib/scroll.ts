import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  if (typeof window === "undefined") {
    return;
  }

  if (target === "top" || target === "#" || target === "/") {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration: 1.35,
        immediate: false,
        force: true,
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const element =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!element) {
    return;
  }

  if (window.__lenis) {
    window.__lenis.scrollTo(element as HTMLElement, {
      offset,
      duration: 1.35,
      immediate: false,
      force: true,
    });
  } else {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    window.scrollTo({
      top: scrollTop + rect.top - 88 + offset,
      behavior: "smooth",
    });
  }

  if (typeof target === "string" && target.startsWith("#") && target !== "#") {
    window.history.pushState(null, "", target);
  }
}
