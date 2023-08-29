const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./router/routes');
const cors = require('cors');

// Connect to MongoDB Atlas
const atlasConnectionURI = 'mongodb+srv://prince3905:1Kt12cs080@cluster0.d8pplqc.mongodb.net/';

mongoose.connect(atlasConnectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(error => {
  console.error('MongoDB Atlas connection error:', error);
});

app.use(express.json());
app.use(cors());
app.use('/api', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
