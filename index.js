var http = require('http');
var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
var appRoutes = require('./routes/appRoutes');
//var mongoose = require('mongoose');
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path')


//const MONGODB_URI = "mongodb+srv://roypa81130:royparakkan123%23@cluster0.zjtqe.mongodb.net/department?retryWrites=true&w=majority";
//mongoose.connect(process.env.MONGODB_URI ,{ useNewUrlParser: true },{ useUnifiedTopology: true },{useMongoClient:true});

//db.js



const url = `mongodb+srv://roypa81130:royparakkan123a@cluster0.zjtqe.mongodb.net/department?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use('/',appRoutes);

app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})


http.createServer(app).listen(port);

console.log("Backened running on port:",port);