"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Lecturas completadas por categoría",
    },
    xAxis: {
      categories: data.map((d) => d.categoria),
      title: { text: "Categorías" },
    },
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: { text: "Cantidad de lecturas" },
    },
    tooltip: {
      formatter: function () {
        const cantidad = this.y;
        const texto = cantidad === 1 ? "lectura" : "lecturas";
        return `<b>${cantidad} ${texto}</b>`;
      },
    },
    legend: {
      enabled: false, //Esto oculta el botón de "Lecturas"
    },
    series: [
      {
        name: "Lecturas",
        data: data.map((d) => d.cantidad),
        colorByPoint: true,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChart;
