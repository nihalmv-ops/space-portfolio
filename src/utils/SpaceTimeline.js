import { scrollState } from "../components/SmoothScroll";

export function getSceneProgress() {
  return scrollState.progress;
}

export function getSection(progress) {
  if (progress < 0.15) return "hero";
  if (progress < 0.30) return "about";
  if (progress < 0.45) return "skills";
  if (progress < 0.60) return "projects";
  if (progress < 0.75) return "experience";
  if (progress < 0.90) return "contact";
  return "footer";
}

export function fade(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;

  return (progress - start) / (end - start);
}

export function fadeOut(progress, start, end) {
  return 1 - fade(progress, start, end);
}

export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}