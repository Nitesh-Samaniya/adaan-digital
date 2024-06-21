require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const ConnectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('Adaan Digital user-profile backend application.');
})

app.listen(PORT, ()=>{
    ConnectDB();
    console.log(`app running on http://localhost:${PORT}`);
})