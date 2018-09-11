const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
app.use(express.json());
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true},(err) => {
    if(err) console.log('Could not Connect');
    else console.log("SuccessFully Connected");
});

const user = require('./routing/route');

app.get('/', (req, res) => {
    res.send("WELCOME TO NODE");
});

app.use('/user', user)

PORT = process.env.PORT;
app.listen(PORT, () => console.log(`At ${PORT} port is running!`));
