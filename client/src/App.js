
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './Result';

function App() {
    const [chosenType, setChosenType] = useState(null);
    const [chosenMag, setChosenMag] = useState(null);
    const [chosenCatalog, setChosenCatalog] = useState(null);
    const [chosenDateRange, setChosenDateRange] = useState(null);
    const [chosenSortOption, setchosenSortOption] = useState(null);
    // const [catalog, setCatalog] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [lists, setLists] = useState(null);
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
          setDocuments(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const sendSearchRequest2 = () => {
      const results = {
        method: 'GET',
        url: 'http://localhost:3001/urbanic',
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
          setDocuments(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const sendBrandRequest=()=>{
      const results = {
        method: 'GET',
        url: 'http://localhost:3001/brands',
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
          setLists(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const sendCatalogRequest= () => {
      const results = {
        method: 'GET',
        url: 'http://localhost:3001/catalog',
        params: {
          search: chosenCatalog,
        },
      };
      
      axios
        .request(results)
        .then((response) => {
          console.log(response.data);
          setDocuments(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  // sendBrandRequest();
  return (
    <div className="App">
      <nav>
        <ul className='nav-bar sticky' >
          <li id="heading">Personify</li>
        </ul>
      </nav>
      <p className='directions'>
        Enter the dress of your dreams
      </p>
      <ul>
        <li>
          <form>
            <label>
              <input
                className='form'
                type='text'
                placeholder='Enter Brand,colour,name,description'
                value={chosenCatalog}
                onChange={(e) => setChosenCatalog(e.target.value)}
              />
            </label>
          </form>
        </li>
      </ul>
      
      <div className='main'>
        <div className='type-selector'>
          {/* <ul>
            <li>
              <select
                name='types'
                id='types'
                value={chosenType}
                onChange={(e) => setChosenType(e.target.value)}
              >
                <option value={null}>Select a Type</option>
                <option value='earthquake'>Earthquake</option>
                <option value='quarry blast'>Quarry Blast</option>
                <option value='ice quake'>Ice Quake</option>
                <option value='explosion'>Explosion</option>
              </select>
            </li>
            <li>
              <select
                name='mag'
                id='mag'
                value={chosenMag}
                onChange={(e) => setChosenMag(e.target.value)}
              >
                <option value={null}>Select magnitude level</option>
                <option value='2.5'>2.5+</option>
                <option value='5.5'>5.5+</option>
                <option value='6.1'>6.1+</option>
                <option value='7'>7+</option>
                <option value='8'>8+</option>
              </select>
            </li>
            
            <li>
              <select
                name='dateRange'
                id='dateRange'
                value={chosenDateRange}
                onChange={(e) => setChosenDateRange(e.target.value)}
              >
                <option value={null}>Select date range</option>
                <option value='7'>Past 7 Days</option>
                <option value='14'>Past 14 Days</option>
                <option value='21'>Past 21 Days</option>
                <option value='30'>Past 30 Days</option>
              </select>
            </li>
            <li>
              <select
                name='sortOption'
                id='sortOption'
                value={chosenSortOption}
                onChange={(e) => setchosenSortOption(e.target.value)}
              >
                <option value={null}>Sort by</option>
                <option value='desc'>Largest Magnitude First</option>
                <option value='asc'>Smallest Magnitude First</option>
              </select>
            </li>
            
          </ul> */}
          <div><button id="Search" onClick={sendCatalogRequest}>Search</button></div>
          <div className="Documents">
            {documents && (
                <div className='search-results'>
                  {documents.length > 0 ? (
                    <p> Number of hits: {documents.length}</p>
                  ) : (
                    <p> No results found. Try broadening your search criteria.</p>
                  )}
                  {documents.map((document) => (
                    <div className='results-card'>
                      <div className='results-text'>
                        <img src={document._source.img} alt="a img"></img>
                        <p><b>Brand:</b> {document._source.brand}</p>
                        <p>Colour: {document._source.colour}</p>
                        <p>Name: {document._source.name}</p>
                        <p>description: {document._source.description}</p>
                        <p>Price: {document._source.price}</p>
                        <p>Rating: {document._source.ratingCount}</p>
                        
                      </div>
                    </div>
                  ))}
                </div>
              )
              }
          </div>
      
          {/* <div className="Lists">
          {lists && (
              <div className='search-results'>
                {lists.length > 0 ? (
                  <p> Number of hits: {lists.length}</p>
                ) : (
                  <p> No results found. Try broadening your search criteria.</p>
                )}
                {lists.map((item) => (
                  <div className='results-card'>
                    <div className='results-text'>
                      <p><b>Brand:</b> {item.key}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
            }
          </div> */}
        </div>
      </div>  
      {/* <div><button id="Search_Urbanic" onClick={sendSearchRequest2}>Search_Urbanic</button></div>
      <div><button id="Search_Brands" onClick={sendBrandRequest}>Search_Brands</button></div> */}
    </div>
    
     );
    
}

export default App;
