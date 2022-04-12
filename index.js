const express = require('express');
const app = express();
const cors = require('cors');
const address = require('./src/routes/address.routes');
const user = require('./src/routes/user.routes');
const foodMenu = require('./src/routes/food-menu.routes');
const auth = require('./src/routes/auth.routes');
const tables = require('./src/routes/tables.routes');
const booking = require('./src/routes/booking.routes');

var corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/address', address);
app.use('/api/user', user);
app.use('/api/foodMenu', foodMenu);
app.use('/api/auth', auth);
app.use('/api/tables', tables);
app.use('/api/booking', booking);

app.listen(3001, () => {
    console.log("Hey, your server is running on port 3001");
})