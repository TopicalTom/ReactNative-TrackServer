require('./src/models/User');
require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoURI = `mongodb+srv://TopicalTom:${process.env.MONGO_DB_KEY}@cluster0.7zy9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});
mongoose.connection.error('error', (err) => {
    console.error('Error connecting to mongo', err)
});

app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});