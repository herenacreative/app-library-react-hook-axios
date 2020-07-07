import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '../views/Home'
import Login from '../views/Login'
import DetailBook from '../views/DetailBook'
import Register from '../views/Register'
import Author from "../views/Auhtor";
import History from "../views/History";
import Explore from "../views/Explore";

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Explore" component={Explore}/>  
          <Route path="/history" component={History}/>  
          <Route path="/author" component={Author}/>
          <Route path="/home/:book_id" component={DetailBook}/> 
          {/* <Route path="/auth/login" component={Login}/> */}
          <Route path="/auth/register" component={Register}/>
          <Route path="/home" component={Home}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}