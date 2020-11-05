import React from 'react';
import './App.css';
import Weapons from './components/Weapons/Weapons';
import Armor from './components/Armor/Armor';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
      <AppBar position="static">
        <Tabs 
          centered
          indicatorColor="danger"
        >
          <Tab href="/armor" label="Armor"/>
          <Tab href="/weapons" label="Weapons"/>
        </Tabs>
      </AppBar>

        <Switch>
          <Route path="/armor">
            <Armor />
          </Route>
          <Route path="/weapons">
            <Weapons />
          </Route>
          <Route path="/">
            <Armor />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
