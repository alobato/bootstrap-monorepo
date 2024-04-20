export function calculatePercentage(base, value) {
  return 100 + ((value - base) / base * 100)
}

export function twoDecimal(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}
