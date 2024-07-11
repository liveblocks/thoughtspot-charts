import { MutableRefObject, useLayoutEffect, useState } from "react";

export function useBoundingRect(ref: MutableRefObject<HTMLElement | null>) {
  let [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    let target = ref.current;
    if (target == null) return;
    setRect(target.getBoundingClientRect());
    let observer = new ResizeObserver(() => {
      // ResizeObserver provides clientRect as a part of observed entries
      // but it's not in sync with result of getBoundingClientRect()
      // which causes unnecessary state update (and so re-renders)
      let newRect = target.getBoundingClientRect();
      // getBoundingClientRect() always returns a new instance
      // DOMRect doesn't have own properties so it needs special shallowEqual implementation
      setRect((rect) => (equals(rect, newRect) ? rect : newRect));
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return rect;
}

function equals(a: any, b: any) {
  if (a == null || b == null) return false;
  for (let key in a) if (a[key] !== b[key]) return false;
  return true;
}
