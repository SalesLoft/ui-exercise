import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/* Layout */
import NavigationLayout from './components/NavigationLayout'

/* Views */
import MessagesIndex from './views/MessagesIndex'
import MessagesShow from './views/MessagesShow'

/*Data*/
import messagesData from './data/emails.json'

class App extends Component {
  render() {
    return (
      <Router>
        <NavigationLayout tags={messagesData}>
          <Switch>
            <Route exact path='/' render={props => <MessagesIndex {...props} messagesData={messagesData} />}/>
            <Route path='/messages/:id'
              render={props => <MessagesShow {...props} messagesData={messagesData} />} />
          </Switch>
        </NavigationLayout>
      </Router>
    );
  }
}

export default App;
