import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { StringOrNumber } from "../../types/common";
import { ApexOptions } from "apexcharts";

type Props = {
  series: number[];
  labels: string[];
  height?: StringOrNumber;
  width?: StringOrNumber;
};

const DonutChart = ({ height, width, series, labels }: Readonly<Props>) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      height: height ?? "100%",
      type: "donut",
    },
    dataLabels: {
      enabled: true,
      formatter:(value)=>{
        return Number(value).toFixed(2);
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
        },
        expandOnClick: true,
      },
    },
    legend: {
      show: false,
    //   position: "bottom",
    //   onItemHover: {
    //     highlightDataSeries: false,
    //   },
    },
    labels: labels,
    tooltip:{
      y:{
        formatter:(value)=>{
          return value + "%";
        }
      }
    }
    // colors: ['#FF4560', '#775DD0', '#FEB019', '#00E396', '#008FFB'],
  } as ApexOptions);

  useEffect(() => {
    setOptions((prev) => ({ ...prev, labels: labels }));
  }, [labels]);

  return (
    <Chart
      series={series}
      options={options}
      type="donut"
      height={height ?? "100%"}
      width={width ?? "100%"}
    />
  );
};

export default DonutChart;
