import React from "react";
import {
  Cards,
  Chart,
  CountryPicker,
  USCards,
  USChart,
  StatePicker,
  Navbar,
  NewsTicker
} from "./components";
import { HashRouter as Router, Route } from "react-router-dom";
import styles from "./App.module.css";
import {
  fetchData,
  fetchUSData,
  fetchDailyStateData,
  currentStateData,
  currentStateNews,
} from "./api";
import { Typography } from "@material-ui/core";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    USData: {},
    stateData: {},
    currentState: "",
    currentStateData: {},
    stateNews: {},
    currentStateMetadata: ""
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedUSData = await fetchUSData();
    const usNews = await currentStateNews("USA")

    this.setState({ data: fetchedData });
    this.setState({ USData: fetchedUSData });
    this.setState({stateNews: usNews})
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };
  handleStateChange = async (stateMetadata) => {
    if (stateMetadata.stateCode.length === 0) {
      const usNews = await currentStateNews("USA")
      this.setState({
        stateData: {},
        currentStateMetadata: "",
        currentStateData: {},
        stateNews: usNews
      });
    } else {
      stateMetadata.stateCode = stateMetadata.stateCode.toLowerCase();
      const fetchedDailyStateData = await fetchDailyStateData(
        stateMetadata.stateCode
      );
      const fetchedCurrentStateData = await currentStateData(
        stateMetadata.stateCode
      );
      console.log(stateMetadata)
      const fetchedStateNews = await currentStateNews(stateMetadata.stateName.replace(/ /g,"+"))

      this.setState({
        stateData: fetchedDailyStateData,
        currentStateMetadata: stateMetadata,
        currentStateData: fetchedCurrentStateData,
        stateNews: fetchedStateNews
      });
    }
  };

  render() {
    const {
      data,
      country,
      USData,
      currentStateMetadata,
      stateData,
      currentStateData,
       stateNews
    } = this.state;
    return (
      <div className={styles.container}>
        <Router>
          <Navbar USData={USData} />
          <Route path="/" strict exact>
            <h1>
              {currentStateMetadata ? currentStateMetadata.stateName : "USA"}
            </h1>
            <StatePicker handleStateChange={this.handleStateChange} />
            <USCards
              USData={USData}
              currentStateData={currentStateData}
              currentStateMetadata={currentStateMetadata}
            />
            <USChart
              stateData={stateData}
              currentStateMetadata={currentStateMetadata}
            />
            <NewsTicker stateNews={stateNews}/>
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