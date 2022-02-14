const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000 || process.env.PORT;
const key = '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';

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gets the fitst 5 products
app.get('/api/products', (req, res) => {
  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: { Authorization: key },
  })
    .then((results) => {
      res.send(results.data);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
