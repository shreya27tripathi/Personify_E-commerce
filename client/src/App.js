import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';


function App() {
  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      // params: {
      //   type: chosenType,
      //   mag: chosenMag,
      //   location: chosenLocation,
      //   dateRange: chosenDateRange,
      //   sortOption: chosenSortOption,
      // },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        // setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="App">
      
      <div><button id="Search" onClick={sendSearchRequest}>Search</button></div>
 
    </div>
     );
    
}

export default App;
