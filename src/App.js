import './App.css';
import Weapons from './components/Weapons/Weapons';
import Armor from './components/Armor/Armor';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
      <AppBar position="static">
        <Tabs 
          indicatorColor="danger"
        >
          <Tab disabled label="Monster Hunter World Data"/>
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
