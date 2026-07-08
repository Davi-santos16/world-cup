import { useEffect } from "react";

export function useScrollEffects() {
  useEffect(() => {
    const observed = new WeakSet<Element>();
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );

    const observe = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          if (observed.has(element)) return;

          observed.add(element);
          reveal.observe(element);
        });
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });

    const pointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty(
        "--pointer-x",
        `${event.clientX}px`,
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${event.clientY}px`,
      );
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => {
      reveal.disconnect();
      mutations.disconnect();
      window.removeEventListener("pointermove", pointer);
    };
  }, []);
}
