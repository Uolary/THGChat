import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Auth } from './Auth';
import { Main } from './Main';
import { Error } from './Error';
import { Page404 } from './404';

const PrivateRoute = ({children, ...rest}) => {
  const auth = false;

  return (
    <Route
      {...rest}
      render={() => (
        auth ? (
          children
        ) : (
          <Redirect to='/auth' />
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
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/error'>
            <Error />
          </Route>
          <Route path='/home/:id'>
            <Main />
          </Route>
          <PrivateRoute exact path='/'>
            HOME
          </PrivateRoute>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
