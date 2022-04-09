const express = require('express');
const app = express();
const cors = require('cors');
const address = require('./src/routes/address.routes');
const user = require('./src/routes/user.routes');

var corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/address', address);
app.use('/api/user', user);

app.listen(3001, () => {
    console.log("Hey, your server is running on port 3001");
})