import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './Result.css';
function Result() {
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
    

  return (
    <div classNmae='Result'>
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
      <div className="Lists">
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
      </div>
      <div><button id="Search" onClick={sendSearchRequest}>Search</button></div>
      <div><button id="Search_Urbanic" onClick={sendSearchRequest2}>Search_Urbanic</button></div>
      <div><button id="Search_Brands" onClick={sendBrandRequest}>Search_Brands</button></div>
    </div>
  )
}

export default Result