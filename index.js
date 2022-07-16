const express = require ('express');
require('dotenv/config');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000

app.use(require('./routes'));

app.listen(port, () => console.log(`Ouvindo a porta: ${port}`));