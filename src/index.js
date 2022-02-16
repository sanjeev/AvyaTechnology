import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css';
import Home from './home';
import Confirmation from './confirmation';
import {Provider} from 'react-redux'
import store from './redux/store'

class Root extends Component {

  render() {
    return (
      <Provider store={store}>
      <Router>
        
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/confirmation" element={<Confirmation />} />
          </Routes>
     
      </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));