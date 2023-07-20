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
        body: {
            
            query: {
                "match_all": {}
            },
          },
    });//search query ends here
    
    res.json(body.hits.hits);
  }

  sendESRequest();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));