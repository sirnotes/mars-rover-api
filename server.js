if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const index = require('./controllers/index');
const photo = require('./controllers/photo');

const server = express();

server.use(bodyParser.json());
server.use(cors({
    origin: 'https://sirnotes.github.io'
}));
server.use(morgan('combined'));
server.use(compression());

server.get('/', index.handleIndex())
server.post('/photos', photo.handlePhoto());

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})