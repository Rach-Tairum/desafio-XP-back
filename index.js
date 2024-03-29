const express = require ('express');
require('dotenv/config');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3000

app.use(require('./routes/routes'));

app.listen(port, () => console.log(`Ouvindo a porta: ${port}`));