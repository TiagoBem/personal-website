import gsap, { Power3 } from "gsap";

export const stagger = (target, fromvVars, toVars) => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...fromvVars },
    { opacity: 1, ...toVars, stagger: 0.2, delay: 0.1, ease: Power3.easeOut }
  );
};
