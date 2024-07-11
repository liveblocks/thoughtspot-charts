import Highcharts from "highcharts";
import HighchartsReact, {
  HighchartsReactProps,
} from "highcharts-react-official";
import styles from "./Chart.module.css";
import { CommentsCanvas } from "./CommentsCanvas";

export function Chart({
  id,
  options,
}: {
  id: string;
  options: HighchartsReactProps;
}) {
  return (
    <div className={styles.chart}>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <CommentsCanvas chartId={id} />
    </div>
  );
}
