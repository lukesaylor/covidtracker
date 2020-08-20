import axios from "axios";
import { NoNegativeCasesFilter, NoOlderThanXDaysFilter } from "./Filters";

const url = "https://covid19.mathdro.id/api";

const sUrl = "https://api.covidtracking.com";

const dataFilters = [];

console.log(dataFilters)

export const registerFilter = (filter) => {
  dataFilters.push(filter);
};

export const removeFilter = () => {
  dataFilters.pop()
};

registerFilter(new NoNegativeCasesFilter());
registerFilter(new NoOlderThanXDaysFilter({ numberOfDays: 180 }));

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const results = await axios.get(changeableUrl);
    return results.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUSData = async () => {
  try {
    const initialUSData = await axios.get(`${sUrl}/v1/us/current.json`);

    return initialUSData.data[0];
  } catch (error) {}
};

let dailyDataCache = null;
export const fetchDailyUSData = async () => {
  try {
    if (!dailyDataCache) {
    const { data } = await axios.get(`${sUrl}/v1/us/daily.json`);
    

    const reverseData = data.map((dailyUSData) => ({
      confirmed: dailyUSData.positive,
      deaths: dailyUSData.death,
      date: dailyUSData.dateChecked,
      recovered: dailyUSData.recovered,
      dailyCases: dailyUSData.positiveIncrease,
    }));

    dailyDataCache = reverseData.reverse();

    for (const filter of dataFilters) {
      dailyDataCache = filter.applyFilter(dailyDataCache);
    }
  }

    return dailyDataCache;
  } catch (error) {}
};

let stateDataCache = {};
export const fetchDailyStateData = async (stateCode) => {
  try {
    if (!stateDataCache[stateCode]) {
      const { data } = await axios.get(
        `${sUrl}/v1/states/${stateCode}/daily.json`
      );

      const reverseData = data.map((stateData) => ({
        confirmed: stateData.positive,
        deaths: stateData.death,
        date: stateData.dateChecked,
        dailyCases: stateData.positiveIncrease,
      }));
      stateDataCache[stateCode] = reverseData.reverse();
    }

    let filteredData = stateDataCache[stateCode];

    for (const filter of dataFilters) {
      filteredData = filter.applyFilter(filteredData);
    }
    return filteredData;
  } catch (error) {}
};

let stateMetadata = null;
export const fetchStates = async () => {
  try {
    if (!stateMetadata) {
      const { data } = await axios.get(`${sUrl}/v1/states/info.json`);

      stateMetadata = data.map((dailyStateData) => ({
        stateInitials: dailyStateData.state,
        stateName: dailyStateData.name,
      }));
    }

    return stateMetadata;
  } catch (error) {}
};

export const currentStateData = async (stateCode) => {
  try {
    var results = await axios.get(`${sUrl}/v1/states/${stateCode}/current.json`);
    return results.data;
  } catch (error) {}
};

 