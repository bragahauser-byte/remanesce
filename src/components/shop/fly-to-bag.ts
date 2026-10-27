/**
 * Microanimação: um pinhão sai do botão e "cai" no ícone da sacola do header.
 * Sem movimento reduzido, nada acontece além do feedback do botão.
 */
export function flyToBag(from: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
  const target = document.querySelector<HTMLElement>("[data-bag-target]");
  if (!target) return Promise.resolve();
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const seed = document.createElement("div");
  seed.setAttribute("aria-hidden", "true");
  seed.style.cssText = `position:fixed;left:${a.left + a.width / 2 - 9}px;top:${a.top + a.height / 2 - 14}px;width:18px;height:28px;z-index:120;pointer-events:none;`;
  seed.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="28" preserveAspectRatio="none"><path d="M12 2.8c2.7 2.9 4 6.4 3.8 10.4-.2 3.7-1.7 6.6-3.8 8-2.1-1.4-3.6-4.3-3.8-8C8 9.2 9.3 5.7 12 2.8z" fill="#650410"/></svg>';
  document.body.appendChild(seed);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const anim = seed.animate(
    [
      { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.55}px, ${dy - 80}px) rotate(160deg) scale(0.9)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) rotate(320deg) scale(0.35)`, opacity: 0.2 },
    ],
    { duration: 850, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  );
  return anim.finished.then(() => {
    seed.remove();
    target.animate([{ transform: "scale(1)" }, { transform: "scale(1.18)" }, { transform: "scale(1)" }], { duration: 400 });
  });
}
