import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./USCards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const USCards = ({
  cardData: { positive, death, recovered, dateChecked, negative, hospitalizedCurrently, inIcuCurrently, onVentilatorCurrently },
  currentStateMetadata,
}) => {
  if (!positive) {
    return "Loading Data...";
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {`${currentStateMetadata.stateName} Infected`}
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={positive} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Active Cases of Covid19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
            {`${currentStateMetadata.stateName} Recovered`}
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Recovered Cases of Covid19
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={10} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
            {`${currentStateMetadata.stateName} Deaths`}
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={death} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Deaths from Covid19
            </Typography>
          </CardContent>
        </Grid>
        {currentStateMetadata.stateName !== "USA" ? (
          <>
            <TableContainer className={styles.stateTable} component={Paper}>
              <Table aria-label="simple table">
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell align="center">
                      <h3>{currentStateMetadata.stateName}</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>{new Date(dateChecked).toDateString()}</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">Infected</TableCell>
                    <TableCell align="center">
                      {positive}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Deaths</TableCell>
                    <TableCell align="center">
                      {death}
                    </TableCell>
                  </TableRow>
                  {recovered ? (
                    <TableRow>
                      <TableCell align="center">Recovered</TableCell>
                      <TableCell align="center">
                        {recovered}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {negative ? (
                    <TableRow>
                      <TableCell align="center">Negative Tests</TableCell>
                      <TableCell align="center">
                        {negative}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {hospitalizedCurrently ? (
                    <TableRow>
                      <TableCell align="center">
                        Currently Hospitalized
                      </TableCell>
                      <TableCell align="center">
                        {hospitalizedCurrently}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {inIcuCurrently ? (
                    <TableRow>
                      <TableCell align="center">Currently in ICU</TableCell>
                      <TableCell align="center">
                        {inIcuCurrently}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {onVentilatorCurrently ? (
                    <TableRow>
                      <TableCell align="center">
                        Currently on Ventilator
                      </TableCell>
                      <TableCell align="center">
                        {onVentilatorCurrently}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : null}
      </Grid>
    </div>
  );
};

export default USCards;
