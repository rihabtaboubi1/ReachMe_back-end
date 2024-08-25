const express = require('express');
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require('./routes/user');

const app = express();
const PORT = 3001;



require('./config/connect');

app.use(bodyParser.urlencoded({ limit: "5000mb" }));


app.use(cors({
    origin: '*',
  }))

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));

app.use('/user' , userRoute);
app.use('/getimage' , express.static('./uploads'))




app.listen(PORT, function () {
    console.log(`Server running on ${PORT}`);
  });