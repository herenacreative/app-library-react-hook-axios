import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

export default function Breadcrumb() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link to={`/home`}>Home</Link>
      <Typography color="textPrimary">Detail Book</Typography>
    </Breadcrumbs>
  );
}
