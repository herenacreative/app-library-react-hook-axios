import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '../views/Home'
import Login from '../views/Login'
import DetailBook from '../views/DetailBook'
import Register from '../views/Register'

export default function Routes() {
  return (
    // function requireAuth(nextState, replace) {
    //   if (!userExists()) {
    //     replace({
    //       pathname: '/signin',
    //       state: { nextPathname: nextState.location.pathname }
    //     })
    //   }
    // }
    <Router>
      <div>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/book/detail-book" component={DetailBook}/>
          <Route path="/auth/login" component={Login}/>
          <Route path="/auth/register" component={Register}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    </Router>
  );
}