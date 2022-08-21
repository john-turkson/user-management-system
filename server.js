const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//MongoDB Connection
connectDB();

//Parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//Set view engine
app.set('view engine', 'ejs');


//Load Assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

//Load Routers
app.use('/', require('./server/routes/router'));

//Run Server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})