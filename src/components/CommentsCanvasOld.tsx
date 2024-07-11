import { Thread } from "@liveblocks/react-ui";
import { ThreadData } from "@liveblocks/core";
import {
  useThreads,
  useEditThreadMetadata,
  useUser,
} from "@liveblocks/react/suspense";
import {
  DataRef,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./CommentsCanvas.module.css";
import { Toolbar } from "./Toolbar";

export function CommentsCanvas({ chartId }: { chartId: string }) {
  const { threads } = useThreads({ query: { metadata: { chartId } } });
  const editThreadMetadata = useEditThreadMetadata();
  const ref = useRef<HTMLDivElement | null>(null);
  const rect = useBoundingRect(ref);

  // Allow click event on avatar if thread moved less than 3px
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  // On drag end, update thread metadata with new coords
  const handleDragEnd = useCallback(
    ({ active, delta, ...r }: DragEndEvent) => {
      const thread = (active.data as DataRef<{ thread: ThreadData }>).current
        ?.thread;

      if (!thread) {
        return;
      }

      console.log(active, delta);

      editThreadMetadata({
        threadId: thread.id,
        metadata: {
          x: thread.metadata.x + delta.x,
          y: thread.metadata.y + delta.y,
        },
      });
    },
    [rect]
  );

  return (
    <div className={`${styles.wrapper} lb-root`} ref={ref}>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {threads.map((thread) => (
          <DraggableThread key={thread.id} thread={thread} />
        ))}
      </DndContext>
      <Toolbar chartId={chartId} />
    </div>
  );
}

// A draggable thread
function DraggableThread({ thread }: { thread: ThreadData }) {
  // Open threads that have just been created
  const startOpen = useMemo(() => {
    return Number(new Date()) - Number(new Date(thread.createdAt)) <= 100;
  }, [thread]);
  const [open, setOpen] = useState(startOpen);

  // Enable drag
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: thread.id,
    data: { thread }, // Pass thread to DndContext drag end event
  });

  // If currently dragging, add drag values to current metadata
  const x = transform ? transform.x + thread.metadata.x : thread.metadata.x;
  const y = transform ? transform.y + thread.metadata.y : thread.metadata.y;

  // Get the creator of the thread
  const { user: creator } = useUser(thread.comments[0].userId);

  return (
    <div
      ref={setNodeRef}
      className={styles.draggableThread}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div {...listeners} {...attributes}>
        <div className={styles.avatar} onClick={() => setOpen(!open)}>
          {creator ? (
            <img
              src={creator.avatar}
              alt={creator.name}
              width="28px"
              height="28px"
              draggable={false}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
      {open ? <Thread thread={thread} className="thread" /> : null}
    </div>
  );
}

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
