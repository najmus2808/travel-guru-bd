import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import SignUp from './components/SignUp/SignUp';
import Booking from './components/Booking/Booking';




function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
        <Header/>
        </Route>
        <Route path="/login">
          <LogIn/>
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/booking">
          <Booking />
        </Route>
        <Route exact path="/">
        <Header/>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
