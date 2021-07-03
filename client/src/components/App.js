import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Authorization } from './Authorization';

const PrivateRoute = ({children, ...rest}) => {
  const auth = false;

  return (
    <Route
      {...rest}
      render={() => (
        auth ? (
          children
        ) : (
          <Redirect to='/authorization' />
        )
      )}
    >
    </Route>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/authorization'>
            <Authorization />
          </Route>
          <Route path='error'>
            ERROR
          </Route>
          <PrivateRoute path='/'>
            HOME
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
