export function isValidInstant(value: Date): boolean {
  return Number.isFinite(value.getTime());
}

export function isIncreasingTimeline(start: Date, end: Date): boolean {
  return isValidInstant(start) && isValidInstant(end) && end.getTime() > start.getTime();
}

export function isValidTransitionTime(at: Date, updatedAt: Date): boolean {
  return isValidInstant(at) && isValidInstant(updatedAt) && at.getTime() >= updatedAt.getTime();
}

export function assertIncreasingTimeline(start: Date, end: Date, message: string): void {
  if (!isIncreasingTimeline(start, end)) {
    throw new TypeError(message);
  }
}
