require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');

const PORT = process.env.PORT || 8080;
const ConnectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let swaggerFile;
if (fs.existsSync('./swagger_output.json')) {
    swaggerFile = require('./swagger_output.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.use('/user', authRoutes);
app.use('/user-profile', userRoute);

app.get('/', (req,res)=>{
    res.send('Adaan Digital user-profile backend application.');
})

app.listen(PORT, ()=>{
    ConnectDB();
    console.log(`app running on http://localhost:${PORT}`);
})