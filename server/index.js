const express = require('express');
const axios = require('axios');
const API_KEY = require('./config');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gets the fitst 5 products
app.get('/api/products', (req, res) => {
  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    });
});
// get product questions
app.get('/api/product/questions', (req, res) => {
  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=40345',
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    });
});
// get product answers
app.get('/api/product/questions/answers', (req, res) => {
  console.log(res);
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${426169}/answers`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
