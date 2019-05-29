import React, {Component} from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Layout from './layouts/Layout'
import AppRoute from './utils/AppRoute'
import Task from './components/Task'
import Tasks from './components/Tasks'
import CreateTask from './components/CreateTask'

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
            <Switch>
              <AppRoute path="/task" layout={Layout} component={Task}></AppRoute>
              <AppRoute exact path="/create" layout={Layout} component={CreateTask}></AppRoute>
              <AppRoute exact path="/" layout={Layout} component={Tasks}></AppRoute>
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App