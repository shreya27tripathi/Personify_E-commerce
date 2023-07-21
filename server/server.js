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
                  size: 1000
                }
              }
            }
      }
    });//search query ends here
      
      res.json(body.aggregations.distinct_brand.buckets);
    }
  
    brandRequest();
  });

  app.get('/catalog', (req, res) => {

    async function CatalogRequest() {
        const passedSearch = req.query.search;  
        const body = await client.search({
          index: 'fashion',
          size:300,
            body: {
              query: {
                multi_match: {
                  query: passedSearch,
                  fields: [
                    "brand^5",
                    "colour ^5",
                    "description",
                    "name"
                  ]
                }
              }
        }
      });//search query ends here
        
        res.json(body.hits.hits);
      }
    
      CatalogRequest();
    });
  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));