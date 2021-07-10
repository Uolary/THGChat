import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Authorization } from './Authorization';
import { Main } from './Main';
import { Error } from './Error';

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
          <Route path='/error'>
            <Error />
          </Route>
          <Route path='/:id'>
            <Main />
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
