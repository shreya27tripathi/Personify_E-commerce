const { Client } = require('@elastic/elasticsearch');
const client = require('./elasticsearch/client');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/results', (req, res) => {

async function sendESRequest() {

    const body = await client.search({
      index: 'fashion',
      size:300,
        body: {
            
            query: {
              "match_all":{},
            },
          },
    });//search query ends here
    
    res.json(body.hits.hits);
  }

  sendESRequest();
});
app.get('/urbanic', (req, res) => {

  async function sendES2Request() {
  
      const body = await client.search({
        index: 'fashion',
        size:300,
          body: {
              
              query: {
                
                  match: {
                    brand: 'URBANIC'
                  }
              
            },
      }});//search query ends here
      
      res.json(body.hits.hits);
    }
  
    sendES2Request();
  });

app.get('/brands', (req, res) => {

  async function brandRequest() {
  
      const body = await client.search({
        index: 'fashion',
        size:300,
          body: {
            aggs: {
              distinct_brand: {
                terms: {
                  field: "brand",
                  size: 15
                }
              }
            }
      }
    });//search query ends here
      
      res.json(body.aggregations.distinct_brand.buckets);
    }
  
    brandRequest();
  });

  app.get('/color', (req, res) => {

    async function colorRequest() {
    
        const body = await client.search({
          index: 'fashion',
          size:300,
            body: {
              aggs: {
                distinct_brand: {
                  terms: {
                    field: "colour",
                    size: 12
                  }
                }
              }
        }
      });//search query ends here
        
        res.json(body.aggregations.distinct_brand.buckets);
      }
    
    colorRequest();
    });

  app.get('/catalog', (req, res) => {

    async function CatalogRequest() {
        const passedSearch = req.query.search; 
        const passedSort = req.query.sort; 
        const body = await client.search({
          index: 'fashion',
          
            body: {
              // sort: [
              //   {
              //     price: {
              //       order: passedSort,
              //     },
              //   },
              // ],
              size:300,
              query: {
                multi_match: {
                  query: passedSearch,
                  fields: [
                    "brand^2",
                    "colour ^2",
                    "description",
                    "name^2",
                   
                  ]
                }
              }
        }
      });//search query ends here
        
        res.json(body.hits.hits);
      }
    
      CatalogRequest();
    });

    app.get('/filter', (req, res) => {
    async function FilterRequest() {
      const passedSearch = req.query.search; 
      const passedSort = req.query.sort; 
      const body = await client.search({
        index: 'fashion',
        
          body: {
            sort: [
              {
                price: {
                  order: passedSort,
                },
              },
            ],
            size:300,
            query: {
              multi_match: {
                query: passedSearch,
                fields: [
                  "brand^2",
                  "colour ^2",
                  "description",
                  "name^2",
                 
                ]
              }
            }
      }
    });//search query ends here
      
      res.json(body.hits.hits);
    }
  
    FilterRequest();
  });
  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));