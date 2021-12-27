export function random(max: number, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}
