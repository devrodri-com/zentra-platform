import type { AuditEvent } from "@/modules/identity/domain/audit-event";
import type { AuditSink } from "@/modules/identity/ports/audit-sink";

export class FakeAuditSink implements AuditSink {
  private readonly recordedEvents: AuditEvent[] = [];

  get events(): readonly AuditEvent[] {
    return this.recordedEvents;
  }

  append(event: AuditEvent): Promise<void> {
    this.recordedEvents.push(event);

    return Promise.resolve();
  }
}
