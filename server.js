// const dotenv = require('dotenv');
// dotenv.config();
const app = require('./app');
const mongoose = require('mongoose');
const { MONGODB_SERVER, PORT } = require('./service.json');

mongoose.connect(MONGODB_SERVER)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.log("MongoDB Connection Failed!", err.message));

const port = PORT || 4003;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})