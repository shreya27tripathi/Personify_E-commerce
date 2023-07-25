
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './Result';

function App() {
 
    const [chosenCatalog, setChosenCatalog] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [chosenSortOption, setchosenSortOption] = useState(null);
    const [chosenPriceOption, setchosenPriceOption] = useState(null);
    const [chosenBrandOption, setchosenBrandOption] = useState(null);
    const [chosenColorOption, setchosenColorOption] = useState(null);
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
          sort: chosenSortOption,
          price: chosenPriceOption,
          brand: chosenBrandOption,
          color:chosenColorOption
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
          {/* <h1 id="Filter">Filters</h1> */}
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
              <select
                name='priceOption'
                id='priceOption'
                value={chosenPriceOption}
                onChange={(e) => setchosenPriceOption(e.target.value)}
              >
                <option value={null}>Choose from</option>
                <option value="999">Below Rs 999/-</option>
                <option value="1999">Below Rs 1999/-</option>
                <option value="5999">Below Rs 5999/-</option>
                <option value="7999">Below Rs 7999/-</option>
                <option value="9999">Below Rs 9999/-</option>
                <option value="10999">Above Rs 9999/-</option>
              </select>
            </li>
          </div>
          <h1>Brands</h1>
          {Brands && (
                  <div className='brands'> 
                    <select
                      name='brandOption'
                      id='brandOption'
                      value={chosenBrandOption}
                      onChange={(e) => setchosenBrandOption(e.target.value)}
                    >
                    <option value={null}>Choose Brand</option>
                    {Brands.length > 0 ? (console.log(Brands.length)) : ( <p> No results found. Try broadening your search criteria.</p>)}
                    {Brands.map
                    ((brand) => 
                      (             
                      <option value={brand.key} >{brand.key}</option>
                      // <li id="brand-list">
                      // <input type="checkbox" id={brand.key}  name={brand.key} value={brand.key}/>
                      // <label for={brand.key}> {brand.key}</label>
                      // </li>
                    ))
                    }
                    </select>
                  </div>
                )
              }


          <h1>Colors</h1>

          {Color && (
                  <div className='colors'> 
                  <select
                      name='colorOption'
                      id='colorOption'
                      value={chosenColorOption}
                      onChange={(e) => setchosenColorOption(e.target.value)}
                    >
                    <option value={null}>Choose Color</option>
                    {Color.length > 0 ? (console.log(Color.length)) : ( <p> No results found. Try broadening your search criteria.</p>)}
                    {Color.map((item) => (             
                      <option value={item.key} >{item.key}</option>
                      // <li id="color-list">
                      // <input type="checkbox" id={item.key}  name={item.key} value={item.key}/>
                      // <label for={item.key}> {item.key}</label>
                      // </li>

                    ))}
                  </select>
                  </div>
                )
              }

          
          
          
             
        </div>
        <div className="result">
              {documents && (
                  <div className='row'>
                    {documents.length > 0 ? (console.log(documents.length)) : ( <img src="https://media.giphy.com/media/CoND5j6Bn1QZUgm1xX/giphy.gif" alt="a gif"/>)}
                    {documents.map((document) => (             
                      <div className="flip-card">
                          <div div className="flip-card-inner">
                              <div className="flip-card-front">
                              <img src={document._source.img} alt="Avatar" className="flip-img" />
                              </div>
                              <div className="flip-card-back">
                              <h1>{document._source.name}</h1>
                              <h3><b>Brand:</b> {document._source.brand}</h3>
                              <h3><b>Colour:</b> {document._source.colour}</h3>
                              <h3><b>Price:</b> {document._source.price}</h3>
                              {/* <h3><b>Rating:</b> {document._source.ratingCount}</h3> */}
                            
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
