import { useCallback, useEffect, useRef, useState } from "react";

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((current) => !current);
  return [value, toggle, setValue] as const;
}

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  // usePrevious intentionally returns the prior render value from a ref.
  // eslint-disable-next-line react-hooks/refs -- standard usePrevious pattern
  const previous = ref.current;

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return previous;
}

export function useEventCallback<T extends (...args: never[]) => unknown>(fn: T): T {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
}

export function useFocusRef() {
  return useRef<HTMLInputElement>(null);
}
