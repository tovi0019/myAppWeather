import logo from './logo.svg';
import './App.css';
import Favorite from './Favorite'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Routing from './Routing'
import Home from './Home'
import store from './Redux/Store'
import { Provider } from 'react-redux'



function App() {
  return (
    <Provider store={store}>
      <Router >
         <Routing/>
        <Switch>
          <div className="App">
          <Route exact path="/" >
              <Home/>
            </Route>
            <Route exact path="/Favorite" >
              <Favorite/>
            </Route> 
          </div>
        </Switch>
      </Router>
     </Provider>
  );
}

export default App;
