const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://mnu4513:monu8181@firstcluster.daae6aq.mongodb.net/job-application", {useNewUrlParser: true})
.then(() => console.log('mongoDB is connected'))
.catch(error => console.log(error));

const route = require('./src/routes/route');
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('express app is running on port ' + process.env.PORT || 3000);
});