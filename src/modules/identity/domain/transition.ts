export type TransitionResult<T, Reason extends string> =
  | { readonly ok: true; readonly value: T; readonly changed: boolean }
  | { readonly ok: false; readonly value: T; readonly changed: boolean; readonly reason: Reason };

export function transitionSuccess<T>(value: T, changed: boolean): TransitionResult<T, never> {
  return { ok: true, value, changed };
}

export function transitionFailure<T, Reason extends string>(
  value: T,
  reason: Reason,
  changed = false,
): TransitionResult<T, Reason> {
  return { ok: false, value, changed, reason };
}

export function assertNever(value: never): never {
  throw new TypeError(`Unexpected domain value: ${String(value)}`);
}
