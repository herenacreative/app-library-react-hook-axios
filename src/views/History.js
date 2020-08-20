import  React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid, Box} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumb from '../components/layout/Breadcrumbs';
import {connect} from 'react-redux'
import {
  postBorrow,
  postReturn,
  getPendingBorrow,
} from "../redux/actions/transaction";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const History = (props) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(props, 'p');
  }, []);

  return (
    <div  style = {{marginTop: '5%', paddingLeft: '5%'}} >
     <Breadcrumb title ='History'/>
   <Box fontSize={50} m={1} fontWeight={500} letterSpacing={6}>History</Box>
   <Grid style = {{marginTop: '5%'}} container spacing={3}>
   <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
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
    </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  // putBook,
  // getBook,
  postBorrow,
  postReturn,
  getPendingBorrow,
};
export default connect(mapStateToProps, mapDispatchToProps)(History);

