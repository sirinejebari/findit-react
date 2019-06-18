import React, { useEffect } from 'react';
import './App.css';
import {
  signIn
} from './store/actions'
import { store } from './store/store'
import Navbar from './components/navbar/navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Home from './components/home/home';
import AdPAge from './components/adPage/addPage';
import AppartHunt from './components/AppartHunt/AppartHunt'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
library.add(faSearch)
//components
// Log the initial state

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()))
// // Dispatch some actions


// // Stop listening to state updates
// unsubscribe()


function App() {
  useEffect(() => {
    // Update the document title using the browser API
    if (!!localStorage.getItem('user')) {
      store.dispatch(signIn(JSON.parse(localStorage.getItem('user'))))
    }

    if (!!localStorage.getItem('access-token')) {
      axios.interceptors.request.use(function (config) {
        config.headers['x-access-token'] =  localStorage.getItem('access-token');
    
        return config;
    });
    }
    
  });
  return (

    <div className="App">
      <div className="app-body">

        <Router>
          <Navbar></Navbar>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/ad-details/:id" component={AdPAge} />
          <Route exact path="/appart-hunt" component={AppartHunt} />
          
        </Router>
      </div>
    </div>
  );
}

export default App;
