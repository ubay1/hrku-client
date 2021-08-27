import type { NextPage } from 'next'
import React from 'react';
import { NextSeo } from 'next-seo';
import { Base } from '../layout/base';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const Home: NextPage = () => {
  const classes = useStyles()
  
  return(
    <Base>
      <NextSeo
        title="Home"
        titleTemplate = '%s - HRKU Client'
        description="Hrku Home Description"
      />
      <div className="m-4">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="favicon.ico"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica. lorem
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    </Base>
  );
}

export default Home
