const { Client } = require('@elastic/elasticsearch')
const fs = require('fs');
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'Io5zDcTsjWYx2ObMLSba'
  },
  tls: {
    ca: fs.readFileSync('/home/shreya/docker/ELK/es-node01/http_ca.crt'),
    rejectUnauthorized: false
  }
})

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected."))

module.exports = client;