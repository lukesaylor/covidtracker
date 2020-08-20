import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "./USChart.module.css";
import moment from 'moment';
 

const USChart = ({ data, currentStateMetadata }) => {
  const BarColor = "#A8DADC";

  const barChartUSCases = (
    <Bar
      data={{
        labels: data.map(({ date }) => new  moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: data.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(0, 255, 0, 1)",
            backgroundColor: `${BarColor}`,
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `${currentStateMetadata.stateName} Cases`,
        },
      }}
    />
  );

  const barChartUSDeaths = (
    <Bar
      data={{
        labels: data.map(({ date }) => new moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: data.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: `${BarColor}`,
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `${currentStateMetadata.stateName} Deaths`,
        },
      }}
    />
  );

  const barChartUSDailyCases = (
    <Bar
      data={{
        labels: data.map(({ date }) => new moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: data.map(({ dailyCases }) => dailyCases),
            label: "Daily New Cases",
            borderColor: "red",
            backgroundColor: `${BarColor}`,
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `${currentStateMetadata.stateName} Daily New Cases`,
        },
      }}
    />
  );

  return (
    <>
      <div className={styles.container}>{barChartUSCases}</div>
      <div className={styles.container}>{barChartUSDeaths}</div>
      <div className={styles.container}>{barChartUSDailyCases}</div>
    </>
  );
};

export default USChart;
