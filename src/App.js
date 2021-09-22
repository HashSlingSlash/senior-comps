import './App.css';
import{ BrowserRouter as Router, 
  Switch,
  Route
  } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Account from "./Components/Account/Account";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/account">
          <Account/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/login">
          <SignIn/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
