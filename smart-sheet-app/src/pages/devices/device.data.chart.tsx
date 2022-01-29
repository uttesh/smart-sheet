import { FC, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  processChartData,
  processChartDataByParam
} from "../../common/utility";
import { Device } from "../../services/device.model";

export interface DataChartProps {
  title: string;
  data: Map<string, unknown>[];
  device: Device;
}

export const DataChart: FC<DataChartProps> = ({ title, data, device }) => {
  const [chartData, setChartData] = useState<any>();
  useEffect(() => {
    let _data = processChartDataByParam(data, device);
    setChartData(_data);
  }, [data]);

  const options = {
    chart: {
      zoomType: "x",
      type: "spline"
    },
    title: {
      text: title
    },
    credits: {
      enabled: false
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in"
    },
    xAxis: {
      crosshair: {
        width: 1
      },
      type: "datetime",
      labels: {
        format: "{value:%d %b %H:%M %p}",
        rotation: -50,
        align: "right"
      }
    },
    legend: {
      enabled: true
    },
    tooltip: {
      valueDecimals: 2,
      valueSuffix: " %"
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: chartData
  };
  return (
    <>
      {chartData && (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          updateArgs={[true]}
        />
      )}
    </>
  );
};
