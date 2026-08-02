import { useRef } from "react";

/** TODO: Return readonly tuple [value, toggle, setValue]. */
export function useToggle(_initial = false) {
  // Stub — replace with useState + readonly tuple return
  void _initial;
  return [false, () => undefined, (_v: boolean) => undefined] as const;
}

/** TODO: Generic debounced value hook. */
export function useDebouncedValue<T>(value: T, _delayMs: number): T {
  void _delayMs;
  return value;
}

/** TODO: Return previous render value. */
export function usePrevious<T>(_value: T): T | undefined {
  void _value;
  return undefined;
}

/** TODO: Stable callback ref pattern. */
export function useEventCallback<T extends (...args: never[]) => unknown>(_fn: T): T {
  return _fn;
}

export function useFocusRef() {
  return useRef<HTMLInputElement>(null);
}
