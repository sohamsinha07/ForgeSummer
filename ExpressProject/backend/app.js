// Import the express module
const express=require('express');
const cors = require("cors");
// Create an instance of the express application
const app=express();
// Specify a port number for the server
require('dotenv').config();
const port=5000;
const messageRoutes = require('./routes/messages');

// use middleware to parse json request bodies
app.use(express.json());
app.use(cors());

app.use('/api/messages', messageRoutes);

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});