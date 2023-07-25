
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './Result';

function App() {
 
    const [chosenCatalog, setChosenCatalog] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [chosenSortOption, setchosenSortOption] = useState(null);
    const [Color, setColorList] = useState(null);
    const [Brands, setBrandList] = useState(null);

    const sendCatalogRequest= () => {
      const results = {
        method: 'GET',
        url: 'http://localhost:3001/catalog',
        params: {
          search: chosenCatalog,
          // sort: chosenSortOption
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

    const sendFilterRequest= () => {
      const results = {
        method: 'GET',
        url: 'http://localhost:3001/filter',
        params: {
          search: chosenCatalog,
          sort: chosenSortOption
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

    const sendColorRequest= () => {
      const results = {
        method: 'GET',
        url: 'http://localhost:3001/color',
      };     
      axios
        .request(results)
        .then((response) => {
          console.log(response.data);
          setColorList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    setTimeout(sendColorRequest(),0);
    
    const sendBrandRequest= () => {
      const results = {
        method: 'GET',
        url: 'http://localhost:3001/brands',
      };     
      axios
        .request(results)
        .then((response) => {
          console.log(response.data);
          setBrandList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    setTimeout(sendBrandRequest(),0);

  return (
    <div className="App">
     
  
  <nav className='nav-bar sticky'>
        
          <h1 id="heading">Personify</h1>
        
  </nav>
  <ul id="SearchBar">
        <li >
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
        <div><button id="Search" onClick={sendCatalogRequest}>Search</button></div>
  </ul>

  
      <div className="grid-container">
        <div className="filter">
          <button id="Search2" onClick={sendFilterRequest}>Apply</button>
          <div className='Sort'>
          <ul>
          <li>
              <select
                name='sortOption'
                id='sortOption'
                value={chosenSortOption}
                onChange={(e) => setchosenSortOption(e.target.value)}
              >
                <option value={null}>Sort by</option>
                <option value='desc'>Price: High to Low</option>
                <option value='asc'>Price: Low to High</option>
              </select>
            </li>
            </ul>
          </div>
          <h1>Prices</h1>
          <div className="prices">
            <li id="price-list">
            <input type="radio" id="p1" name="prices" value="999"/>
            <label for="p1">Below Rs 999/-</label>
            </li>
            <li id="price-list">
            <input type="radio" id="p2" name="prices" value="1999"/>
            <label for="p2">Below Rs 1999/-</label>
            </li>
            <li id="price-list">
            <input type="radio" id="p3" name="prices" value="5999"/>
            <label for="p3">Below Rs 5999/-</label>
            </li>
            <li id="price-list">
            <input type="radio" id="p4" name="prices" value="7999"/>
            <label for="p4">Below Rs 7999/-</label>
            </li>
            <li id="price-list">
            <input type="radio" id="p5" name="prices" value="9999"/>
            <label for="p5">Below Rs 9999/-</label>
            </li>
            <li id="price-list">
            <input type="radio" id="p6" name="prices" value="10999"/>
            <label for="p6">Above Rs 9999/-</label>
            </li>
          </div>
          <h1>Brands</h1>
          {Brands && (
                  <div className='brands'> 
                    {Brands.length > 0 ? (console.log(Brands.length)) : ( <p> No results found. Try broadening your search criteria.</p>)}
                    {Brands.map((brand) => (             
                      
                      <li id="brand-list">
                      <input type="checkbox" id={brand.key}  name={brand.key} value={brand.key}/>
                      <label for={brand.key}> {brand.key}</label>
                      </li>

                    ))}
                  </div>
                )
              }


          <h1>Colors</h1>

          {Color && (
                  <div className='colors'> 
                    {Color.length > 0 ? (console.log(Color.length)) : ( <p> No results found. Try broadening your search criteria.</p>)}
                    {Color.map((item) => (             
                      
                      <li id="color-list">
                      <input type="checkbox" id={item.key}  name={item.key} value={item.key}/>
                      <label for={item.key}> {item.key}</label>
                      </li>

                    ))}
                  </div>
                )
              }

          
          
          
             
        </div>
        <div className="result">
              {documents && (
                  <div className='row'>
                    {documents.length > 0 ? (console.log(documents.length)) : ( <p> No results found. Try broadening your search criteria.</p>)}
                    {documents.map((document) => (             
                      <div className="flip-card">
                          <div div className="flip-card-inner">
                              <div className="flip-card-front">
                              <img src={document._source.img} alt="Avatar" className="flip-img" />
                              </div>
                              <div className="flip-card-back">
                              <h1>Name: {document._source.name}</h1>
                              <p><b>Brand:</b> {document._source.brand}</p>
                              <p>Colour: {document._source.colour}</p>
                              <p>Price: {document._source.price}</p>
                              <p>Rating: {document._source.ratingCount}</p>
                            
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                )
              }
        </div> 
      
        <div className="footer">Footer</div>
      </div>
</div>
      
      
      
  
    
    
     );
    
}

export default App;
