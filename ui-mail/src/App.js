import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationLayout from './components/NavigationLayout'
import MessagesList from './views/MessagesList'

class App extends Component {
  render() {
    return (
      <Router>
        <NavigationLayout>
          <Switch>
            <Route exact path='/' component={MessagesList}/>
            <Route exact path='/messages/:id'/>
          </Switch>
        </NavigationLayout>
      </Router>
    );
  }
}

export default App;
