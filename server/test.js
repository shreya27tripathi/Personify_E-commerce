body: {
    sort: [
      {
        mag: {
          order: passedSortOption,
        },
      },
    ],
    size: 300,
    query: {
      bool: {
        filter: [
          {
            term: { type: passedType },
          },
          {
            range: {
              mag: {
                gte: passedMag,
              },
            },
          },
          {
            match: { place: passedLocation },
          },

          {
            range: {
              '@timestamp': {
                gte: `now-${passedDateRange}d/d`,
                lt: 'now/d',
              },
            },
          },
        ],
      },
    },
  },
});//search query ends here



{Color && 
  ( 

    {Color.length > 0 ? (console.log(Color.length)) : ( <p> No results found. Try broadening your search criteria.</p>)}
    {Color.map((item) => (             
              <li id="color-list">
                <input type="checkbox" id={item.key}  name={item.key} value={item.key}/>
                <label for={item.key}> {item.key}</label>
              </li>
    ))}

    )
    }
  

    {Brands.length > 0 ? (console.log(Brands.length)) : (<p> No results found. Try broadening your search criteria.</p>)}
    {Brands.map((brand) => (             
      <li id="color-list">
        <input type="checkbox" id={brand.key} name={brand.key} value={brand.key}/>
        <label for={brand.key}> {brand.key}</label>
      </li>
    ))}