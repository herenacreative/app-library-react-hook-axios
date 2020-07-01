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

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/books/:book_id" component={DetailBook}/> 
          {/* <Route path="/auth/login" component={Login}/> */}
          <Route path="/auth/register" component={Register}/>
          <Route path="/books" component={Home}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}