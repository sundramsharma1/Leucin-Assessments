require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


const todoRoutes = require('./routes/todos');
const summaryRoutes = require('./routes/summary');

app.use('/todos', todoRoutes);
app.use('/summarize', summaryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});