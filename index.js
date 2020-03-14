
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')

require('dotenv').config()

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined"));
app.use(cors());
 app.use(morgan('dev'))
 


const uri = process.env.DB_URI
// const uri = 'mongodb+srv://siva:5353@learningcluster-jr3su.mongodb.net/test?retryWrites=true&w=majority'
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect(uri)

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB connected successfully');
});

const imgRoute = require('./route/api')

app.use('/api', imgRoute)

app.listen('8000', () => {
    console.log('server started at 8000');
})
