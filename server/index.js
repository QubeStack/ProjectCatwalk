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
  console.log(req.query);
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${req.query.product_id}`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    });
});
// get product answers
app.get('/api/product/questions/answers', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.query.product_id}/answers`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    });
});
// increase helpful count of question
app.put('/api/product/questions/helpful', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.query.question_id}/helpful`,
    headers: { Authorization: API_KEY },
  })
    .then(() => {
      console.log('success');
      res.sendStatus(200);
    });
});

// increase helpful count of answer
app.put('/api/product/questions/answers/helpful', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.query.answer_id}/helpful`,
    headers: { Authorization: API_KEY },
  })
    .then(() => {
      console.log('success');
      res.sendStatus(200);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
