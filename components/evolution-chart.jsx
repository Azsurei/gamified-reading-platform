"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const EvolucionChart = ({ data }) => {
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Evolución del puntaje por lectura",
    },
    xAxis: {
      categories: data.map((item) => item.lectura),
      title: {
        text: "Orden de lectura",
      },
    },
    yAxis: {
      title: {
        text: "Puntaje",
      },
      max: 100,
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b><br/>Puntaje: <b>${this.y}%</b><br/>Fecha: ${data[this.point.index].fecha}`;
      },
    },
    series: [
      {
        name: "Puntaje",
        data: data.map((item) => item.puntaje),
        color: "#4CAF50",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EvolucionChart;
