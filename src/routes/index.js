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
import Genre from "../views/Genre";
import Book from "../views/Book";
import Dashboard from "../views/Dashboard";

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>

          <Route path="/dashboard" component={Dashboard}/>  
          <Route path="/explore" component={Explore}/>  
          <Route path="/history" component={History}/>  
          <Route path="/author" component={Author}/>
          <Route path="/genre" component={Genre}/>
          <Route path="/home/:book_id" component={DetailBook}/> 
          <Route path="/book" component={Book}/>
          <Route path="/auth/register" component={Register}/>
          <Route path="/home" component={Home}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}