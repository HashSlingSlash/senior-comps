import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { SignUp } from './Components/SignUp/SignUp'
import { Home } from './Components/Home/Home'
import { AuthProvider, useAuth } from './Contexts/Auth'
import { SignIn } from './Components/SignIn/SignIn'
import { Account } from './Components/Account/Account'
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { NonUserRoute } from './Components/NonUserRoute/NonUserRoute';
import { Show } from './Components/Show/Show';
import { Review } from './Components/Review/Review';
import { DisplayProfiles } from './Components/DisplayProfiles/DisplayProfiles';
import { Bio } from './Components/Bio/Bio';
import { CheckIn } from './Components/CheckIn/CheckIn';


export default function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <NonUserRoute exact path="/signup" component={SignUp} />
            <NonUserRoute exact path="/signin" component={SignIn} />
            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute path="/courts/:courtID" component={Show} />
            <PrivateRoute path="/reviews/:courtID" component={Review} />
            <PrivateRoute exact path="/users" component={DisplayProfiles} />
            <PrivateRoute path="/users/:userID" component={Bio} />
            <PrivateRoute path="/checkin/:courtID" component={CheckIn} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}
