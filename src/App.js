import React, { Component } from 'react'
import Root from './components/common/Root'
import store from './redux/store'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import history from './history'
import './config'

class App extends Component {
  render() {
    return (
		<Provider store={ store } >
			<ConnectedRouter history={ history }>
				<Root />
			</ConnectedRouter>
		</Provider>
    )
  }
}

export default App
