import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';

const Breadcrumb = ({title='Default'}) =>{
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link to={`/home`}>Home</Link>
      <Typography color="textPrimary">{title}</Typography>
    </Breadcrumbs>
    </>
  );
}

export default Breadcrumb
