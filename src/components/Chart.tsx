import Highcharts from "highcharts";
import HighchartsReact, {
  HighchartsReactProps,
} from "highcharts-react-official";
import styles from "./Chart.module.css";
import { CommentsCanvas } from "./CommentsCanvas";
import Sankey from "highcharts/modules/sankey";
import { useThreads } from "@liveblocks/react/suspense";
import { Thread } from "@liveblocks/react-ui";

Sankey(Highcharts);

export function Chart({
  id,
  options,
  showThreadList,
}: {
  id: string;
  options: HighchartsReactProps;
  showThreadList: boolean;
}) {
  const { threads } = useThreads({ query: { metadata: { chartId: id } } });

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chart}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <CommentsCanvas chartId={id} threads={threads} />
      </div>
      {showThreadList ? (
        <div className={styles.threads}>
          {threads.map((thread) => (
            <Thread thread={thread} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
