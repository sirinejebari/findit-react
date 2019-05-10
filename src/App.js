import React, { useEffect } from 'react';
import './App.css';
import {
  signIn
} from './store/actions'
import { store } from './store/store'
import Navbar from './components/navbar/navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Map from './components/map/map'
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
  });
  return (

    <div className="App">
      <Navbar></Navbar>
      <div className="map-container ">
        <div className="default-view">
          <p className="subtitle is-4">Opportunities in your area</p>
          <div className="main-map card">
            <Map ></Map>
          </div></div>
      </div>
    </div>
  );
}

export default App;
