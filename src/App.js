import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SignUp } from './Components/SignUp/SignUp'
import { Home } from './Components/Home/Home'
import { AuthProvider } from './Contexts/Auth'
import { SignIn } from './Components/SignIn/SignIn'
import { Account } from './Components/Account/Account'
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { NonUserRoute } from './Components/NonUserRoute/NonUserRoute';

export default function App() {
  return (
    <div>
      <h1>Senior Comps</h1>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <NonUserRoute exact path="/signup" component={SignUp} />
            <NonUserRoute exact path="/signin" component={SignIn} />
            <PrivateRoute exact path="/account" component={Account} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}
