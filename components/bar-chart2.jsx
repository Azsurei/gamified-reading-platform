"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const BarChartPromedioPorCategoria = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Efectividad por categoría",
    },
    xAxis: {
      categories: data.map((d) => d.categoria),
      title: { text: "Categorías" },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: { text: "Efectividad (%)" },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.y}%</b> de efectividad`;
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Promedio",
        data: data.map((d) => d.promedioPuntaje),
        colorByPoint: true,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChartPromedioPorCategoria;
