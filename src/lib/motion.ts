import type { Variants, Transition } from "motion/react";

export const ATELIER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const SPECULAR_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const atelierSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.8,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: ATELIER_EASE,
    },
  },
};

export const lineMaskItem: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.72,
      ease: SPECULAR_EASE,
    },
  },
};

export const sectionHeaderReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: ATELIER_EASE,
    },
  },
};

export const panelCrossfade: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: ATELIER_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: ATELIER_EASE,
    },
  },
};
