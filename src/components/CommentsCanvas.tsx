import { Thread } from "@liveblocks/react-ui";
import { ThreadData } from "@liveblocks/client";
import { useThreads, useUser } from "@liveblocks/react/suspense";
import { useDraggable } from "@dnd-kit/core";
import { useMemo, useRef, useState } from "react";
import styles from "./CommentsCanvas.module.css";
import { Toolbar } from "./Toolbar";
import { useBoundingRect } from "./useBoundingRect";

export function CommentsCanvas({
  chartId,
  threads,
}: {
  chartId: string;
  threads: ThreadData[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rect = useBoundingRect(ref);

  return (
    <div className={`${styles.wrapper} lb-root`} ref={ref}>
      {threads.map((thread) => (
        <ChartThread key={thread.id} thread={thread} />
      ))}
      {rect ? <Toolbar rect={rect} chartId={chartId} /> : null}
    </div>
  );
}

function ChartThread({ thread }: { thread: ThreadData }) {
  // Open threads that have just been created
  const startOpen = useMemo(() => {
    return Number(new Date()) - Number(new Date(thread.createdAt)) <= 100;
  }, [thread]);

  const [open, setOpen] = useState(startOpen);

  // Get the creator of the thread
  const { user: creator } = useUser(thread.comments[0].userId);

  return (
    <div
      className={styles.chartThread}
      style={{
        position: "absolute",
        left: `${thread.metadata.x * 100}%`,
        top: `${thread.metadata.y * 100}%`,
      }}
    >
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
      {open ? <Thread thread={thread} className="thread" /> : null}
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

  const { x, y } = thread.metadata;

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
