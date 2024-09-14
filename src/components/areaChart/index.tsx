import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import useColors from "../../hooks/useColors";
import { StringOrNumber } from "../../types/common";
import { useEffect, useState } from "react";

export type AreaChartSeriesType = {
  name:string;
  data:number[];
};

type Props = {
  categoriesList: StringOrNumber[];
  series:AreaChartSeriesType[];
  height?:StringOrNumber;
  width?:StringOrNumber;
};

const AreaChart = ({categoriesList,height,width,series}:Readonly<Props>) => {
  const colors = useColors();
  const [options,setOptions] = useState<ApexOptions>({
    chart: {
      height: height,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      // type: "datetime",
      categories: categoriesList,
    },
    yaxis:{
      labels:{
        show:false,
      }
    },
    tooltip: {
      // x: {
      //   format: "dd/MM/yy HH:mm",
      // },
    },
    grid:{
      xaxis:{
        lines:{
          show:false,
        }
      },
      yaxis:{
        lines:{
          show:false
        }
      }
    },
    colors:[`${colors.greenAccent[400]}`,],
  } as ApexOptions);

  useEffect(()=>{
    setOptions((prev)=>({...prev,chart:{...prev.chart,height:height,}}));
  },[categoriesList]);


  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width={width}
      height={height}
    />
  );
};

export default AreaChart;
