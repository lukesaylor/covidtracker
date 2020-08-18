import React from "react";
import styles from "./NewsTicker.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const NewsTicker = ({ stateNews }) => {
  console.log(stateNews);
  const classes = useStyles();

  const NewsCards = stateNews.length
    ? stateNews.slice(0, 4).map((stateNews, i) => (
        <Grid item height="100%" component={Card} xs={10} md={3} key={i}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={stateNews.urlToImage}
                title="news"
              />
              <CardContent className={classes.media}>
                <Typography gutterBottom variant="body2" component="h5">
                  {stateNews.title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button href={stateNews.url} size="small" color="primary">
                {stateNews.source.name}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))
    : (<div>Loading News...</div>);

  return (
    <div className={styles.newsContainer}>
      <h1>COVID News</h1>
      <Grid container spacing={1}>
        {NewsCards}
      </Grid>
    </div>
  );
};

export default NewsTicker;
