import React from "react";
import {
  Cards,
  Chart,
  CountryPicker,
  USCards,
  USChart,
  StatePicker,
  Navbar,
  FilterSelect,
} from "./components";
import { HashRouter as Router, Route } from "react-router-dom";
import styles from "./App.module.css";
import {
  fetchData,
  fetchUSData,
  fetchDailyStateData,
  currentStateData,
  currentStateNews,
  fetchDailyUSData

} from "./api";
import { Typography } from "@material-ui/core";
import { NoOlderThanXDaysFilter } from "./api/Filters";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    USData: {},
    USDailyData: [],
    stateData: [],
    currentState: "",
    currentStateData: {},

    currentStateMetadata: { stateName: "USA" },

    numberOfDaysFilter: new NoOlderThanXDaysFilter({ numberOfDays: 60 }) ,
  };

  async componentDidMount() {
    const fetchedData = fetchData();
    const fetchedUSData = fetchUSData();
    const usDailyData = fetchDailyUSData();

    this.setState({ data: await fetchedData, USData: await fetchedUSData, USDailyData: await usDailyData });
  }

  handleFilterChange = (dataAge) => {
    dataAge = Number.parseInt(dataAge);
    this.setState({ numberOfDaysFilter: new NoOlderThanXDaysFilter({ numberOfDays: dataAge }) })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  handleStateChange = async (stateMetadata) => {
    if (stateMetadata.stateCode.length === 0) {
      this.setState({
        stateData: {},
        currentStateMetadata: { stateName: "USA" },
        currentStateData: {},
      });
    } else {
      stateMetadata.stateCode = stateMetadata.stateCode.toLowerCase();
      
      const fetchedDailyStateData = fetchDailyStateData(
        stateMetadata.stateCode
      );
      const fetchedCurrentStateData = currentStateData(
        stateMetadata.stateCode
      );

      debugger;

      this.setState({
        stateData: await fetchedDailyStateData,
        currentStateMetadata: stateMetadata,
        currentStateData: await fetchedCurrentStateData,
      });
    }
  };

  render() {
    let {
      data,
      country,
      USData,
      USDailyData,
      currentStateMetadata,
      stateData,
      currentStateData,
      numberOfDaysFilter
    } = this.state;

    let selectedData = stateData.length > 0 ? stateData : USDailyData;
    if (numberOfDaysFilter && selectedData.length > 0) {
      selectedData = numberOfDaysFilter.applyFilter(selectedData);
    }

    const cardDataSource = currentStateMetadata.stateName === "USA" ? USData : currentStateData;

    let cardData = {
        positive: cardDataSource.positive,
        recovered: cardDataSource.recovered,
        death: cardDataSource.death,
        dateChecked: cardDataSource.dateChecked,
        negative: cardDataSource.negative,
        hospitalizedCurrently: cardDataSource.hospitalizedCurrently, 
        inIcuCurrently: cardDataSource.inIcuCurrently, 
        onVentilatorCurrently: cardDataSource.inIcuCurrently 
      };

    return (
      <div className={styles.container}>
        <Router>
          <Navbar USData={USData} />
          <Route path="/" strict exact>
            <h1>
              {currentStateMetadata.stateName}
            </h1>
            <StatePicker handleStateChange={this.handleStateChange} />
            <USCards
              cardData={cardData}
              currentStateMetadata={currentStateMetadata}
            />
            <FilterSelect handleFilterChange={this.handleFilterChange} />
            <USChart
              data={selectedData}
              currentStateMetadata={currentStateMetadata}
            />
          </Route>
          <Route path="/world" strict exact>
            <h1>{country ? `${country}` : "World"}</h1>
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Cards data={data} />
            <Chart data={data} country={country} />
          </Route>
          <a href="http://www.lukassaylor.com/">Lukas Saylor</a>
          <Typography>2020</Typography>
        </Router>
      </div>
    );
  }
}

export default App;

//cdd0e980c7ae4905a7a7d2cdc5db6932 news api key
