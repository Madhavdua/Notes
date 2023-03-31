console.log('I am Index file');
const connectToMongo=require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 5000;
let cors = require('cors')
app.use(cors());


// to avoid req. body is undefined i use below 2 statements
app.use(express.json());
app.use(express.urlencoded());
// 


app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})