import type { AuditEvent } from "../domain/audit-event";

export interface AuditSink {
  append(event: AuditEvent): Promise<void>;
}
