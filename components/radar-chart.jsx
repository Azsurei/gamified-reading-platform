// components/RadarChart.js
"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

// Extiende Highcharts solo una vez
if (typeof HighchartsMore === "function" && !Highcharts.__extended) {
  HighchartsMore(Highcharts);
  Highcharts.__extended = true; // Marca como extendido
}

const RadarChart = ({ data }) => {
  const chartOptions = {
    chart: {
      polar: true,
      type: "line",
    },
    title: {
      text: "Efectividad por desempeño",
    },
    xAxis: {
      categories: data.map((d) => d.nombreDesempeno),
      tickmarkPlacement: "on",
      lineWidth: 0,
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 100,
    },
    tooltip: {
      shared: true,
      pointFormat: "<span>{point.category}</span>: <b>{point.y}%</b><br/>",
    },
    legend: {
      enabled: false, //Esto oculta el botón de "Lecturas"
    },
    series: [
      {
        name: "Promedio",
        type: "line",
        data: data.map((d) => d.puntajePromedio),
        pointPlacement: "on",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default RadarChart;
