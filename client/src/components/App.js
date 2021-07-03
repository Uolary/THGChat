import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

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
            <div>
              AUTH
            </div>
          </Route>
          <Route path='error'>
            ERRPOR
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