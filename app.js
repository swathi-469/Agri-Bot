//FINAL PRODUCT HERE
var bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    express        = require("express"),
    flash          = require("connect-flash"),
    cookieParser   = require("cookie-parser"),
    session        = require("express-session"),
    app            = express(),
    fs             = require("fs");
var server         = require("http").Server(app);
var io             = require('socket.io')(server);
var connected_socket;
var status         = 0;
var last_time      = "";
var last_position  = "";
fs.readFile("status.txt","utf8",(err,data)=>{
  if (err) throw err;
  status = data;
})
fs.readFile("history.txt","utf8",(err,data)=>{
  if (err) throw err;
  data = data.split(";");
  last_position = data[0];
  last_time= data[1];
})
function writeHistory() {
    //get current date
    var date = new Date();
    //get current time
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth();
    // month = (month < 10 ? "0" : "") + month;
    var monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    month = monthArray[month];

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    last_time =  year +' '+ month + " " + day + "," + hour + ":" + min + "." + sec;
    // write calibration time and position to the history text file
    fs.writeFile("history.txt", last_position+";"+last_time, function(err) {
    if(err) {
        return console.log(err);
    };
});
}
app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next){
  res.io = io;
  next();
});
app.use(function(req, res, next){
   // res.locals.currentUser = req.user;
   res.locals.error   = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
io.on("connection",(socket)=>{
  connected_socket = socket;
});
app.get('/',(req,res)=>{
  res.render('home',{status:status,last_position:last_position,last_time:last_time});
});
app.get('/instruction',(req,res)=>{
  res.render('instruction');
});
app.post('/new_ph',(req,res)=>{
  last_position = Object.getOwnPropertyNames(req.body)[0];
  res.io.emit('send_data', { "data":last_position });
  //console.log(connected_socket.connected);
  connected_socket.on('success',function(message){
      console.log("success");
      status = message;
      writeHistory(); //store calibration history in a text file
      req.flash("success",last_position);
    });
  connected_socket.on('error',function(){
      console.log("error");
      req.flash("error","Some error exists!! Try to recalibrate !!!");
    });
  setTimeout(function(){
      //res.redirect('/bio');
      connected_socket.removeAllListeners("success");
      connected_socket.removeAllListeners("error");
      res.redirect('/');

    },6000)
});


server.listen(process.env.PORT || 9000, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
})
