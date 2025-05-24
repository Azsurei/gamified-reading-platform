"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const EvolucionChart = ({ data }) => {
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Evolución del puntaje por intento de lectura",
    },
    xAxis: {
      categories: data.map((item) => item.numero.toString()),
      title: {
        text: "Intentos completados",
      },
    },
    yAxis: {
      title: {
        text: "Efectividad (%)",
      },
      max: 100,
    },
    tooltip: {
      formatter: function () {
        const item = data[this.point.index];
        return `
          <b>${item.titulo}</b><br/>
          Efectividad: <b>${this.y}%</b><br/>
          Reintento: ${item.numeroReintento}<br/>
          Fecha: ${item.fecha}
        `;
      },
    },
    series: [
      {
        name: "Efectividad",
        data: data.map((item) => item.efectividad),
        color: "#4CAF50",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EvolucionChart;
