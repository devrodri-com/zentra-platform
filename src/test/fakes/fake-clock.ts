import type { Clock } from "@/modules/identity/ports/clock";

export class FakeClock implements Clock {
  constructor(private currentTime: Date) {}

  set(time: Date): void {
    this.currentTime = new Date(time);
  }

  now(): Date {
    return new Date(this.currentTime);
  }
}
