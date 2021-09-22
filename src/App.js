import './App.css';
import{ BrowserRouter as Router, 
  Switch,
  Route
  } from "react-router-dom";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import Account from "./Components/Account/Account";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/account">
          <Account/>
        </Route>
        <Route path="/login">
          <Auth/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
