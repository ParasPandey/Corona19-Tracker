import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  responsive: true,
  plugins: {
    htmlLegend: {
      containerID: "legend-container",
    },
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  //   maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value, index, values) {
          return numeral(value).format("0a");
        },
      },
    },
  },
};

export const ChartLine = ({ casesType }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const cData = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      );
      const chartData = buildChart(cData.data, casesType);
      setData(chartData);
    };
    fetchData();
  }, [casesType]);

  const buildChart = (ownData, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;
    for (let date in ownData.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: ownData[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = ownData[casesType][date];
    }
    return chartData;
  };
  return (
    <div className="chartLine">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                fill: true,
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};
