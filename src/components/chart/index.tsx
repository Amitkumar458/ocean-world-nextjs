import Chart from "chart.js/auto";
import { dataType } from "./const";

import { useEffect, useRef,memo } from "react";

type chartConfType = {
  type: "doughnut"|"pie";
  data: dataType;
};

const ChartComp = ({type,data}:Readonly<chartConfType>) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const ChartConf: chartConfType = {
    type: type,
    data: data,
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chartItem = new Chart(ctx, ChartConf);
        return () => {
          chartItem.destroy();
        }
      }
    }
  }, [type,data]);

  return <canvas ref={chartRef} style={{ padding:"10px"}} />;
};

export default memo(ChartComp);
