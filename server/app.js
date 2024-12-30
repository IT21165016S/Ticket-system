require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");

const app = express();

app.use(cors());
// to access request body we need to put this
app.use(express.json({ limit: "50mb" }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const ticketRoutes = require('./routes/ticketRoute');
const userRoutes = require('./routes/userRoutes');


app.use('/api/tickets', ticketRoutes)
app.use('/api/users', userRoutes)













mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // make the app listen to port 4000 for requests from frontend only after the db connection is done
    app.listen(process.env.PORT, () => {
      console.log(
        "Database connection success. Listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log("Database Connection Error : ", error);
  });
