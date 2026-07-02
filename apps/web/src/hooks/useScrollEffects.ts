import { useEffect } from "react";

export function useScrollEffects() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
          else if (entry.boundingClientRect.top > 0)
            entry.target.classList.remove("is-visible");
        }),
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );

    const observe = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => reveal.observe(element));
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
