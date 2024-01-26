const express= require('express');
const app = express();
const port = 8000;
const path = require('path');

app.set('view engine',ejs);
app.set('views',path.resolve('./views'))


app.listen(port,()=>console.log(`server started on port : ${port}`));