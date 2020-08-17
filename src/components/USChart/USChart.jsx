import React, { useState, useEffect } from "react";
import { fetchDailyUSData } from "../../api";
import { Bar } from "react-chartjs-2";
import styles from "./USChart.module.css";
import moment from 'moment';
 

const USChart = ({ stateData, currentStateMetadata }) => {
  const [dailyUSData, setDailyUSData] = useState([]);

  useEffect(() => {
    const fetchUSAPI = async () => {
      setDailyUSData(await fetchDailyUSData());
    };
    fetchUSAPI();
  }, []);

  const BarColor = "#A8DADC";

  const barChartUSCases = stateData.length ? (
    <Bar
      data={{
        labels: stateData.map(({ date }) => new  moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: stateData.map(({ confirmed }) => confirmed),
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
  ) : (
    <Bar
      data={{
        labels: dailyUSData.map(({ date }) => new moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: dailyUSData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(0, 255, 0, 1)",
            backgroundColor: `${BarColor}`,
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `USA Cases` },
      }}
    />
  );
  const barChartUSDeaths = stateData.length ? (
    <Bar
      data={{
        labels: stateData.map(({ date }) => new moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: stateData.map(({ deaths }) => deaths),
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
  ) : (
    <Bar
      data={{
        labels: dailyUSData.map(({ date }) => new moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: dailyUSData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: `${BarColor}`,
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `USA Deaths` },
      }}
    />
  );

  const barChartUSDailyCases = stateData.length ? (
    <Bar
      data={{
        labels: stateData.map(({ date }) => new moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: stateData.map(({ dailyCases }) => dailyCases),
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
  ) : (
    <Bar
      data={{
        labels: dailyUSData.map(({ date }) => new moment(date).calendar('MMM Do YY')),
        datasets: [
          {
            data: dailyUSData.map(({ dailyCases }) => dailyCases),
            label: "Daily New Cases",
            borderColor: "red",
            backgroundColor: `${BarColor}`,
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `USA Daily New Cases` },
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
