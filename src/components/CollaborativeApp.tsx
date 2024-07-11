"use client";

import { Chart } from "./Chart";
import styles from "./CollaborativeApp.module.css";
import { useThreads } from "@liveblocks/react/suspense";

const chart1 = {
  title: {
    text: "My chart",
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
};

const chart2 = {
  xAxis: {
    categories: ["A", "B", "C"],
  },
  series: [{ data: [1, 2, 3] }],
};

export function CollaborativeApp() {
  const { threads } = useThreads();

  return (
    <div className={styles.wrapper}>
      <Chart id="chart-1" options={chart1} />
      <Chart id="chart-2" options={chart2} />
    </div>
  );
}
