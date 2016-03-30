var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

var routes = require('./routes/index');
var users = require('./routes/users');
var networkConf = require('./routes/network-config');
var networkCheck = require('./routes/network-check');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/wifi', networkConf);
app.use('/network',networkCheck);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

require('dns').resolve('www.google.com', function(err, addr){
    if (err) {
	console.log("internet state : no!");
        // check mode ap or client
        fs.readFile('/home/pi/temp-files/mode','utf8', function(err, data) {
             
             var word = data.substr(0,2);
	    
             if(word==='WI')
             {
		console.log('server running at WIFI mode!');
                // change AP MODE 
		var child = exec("sudo /home/pi/rasp-simple-wifi-client-ap-switcher/goAP ", function(error, stdout, stderr){
			if(error) throw err;
			console.log(stdout);
			console.log('Ap mode fin.');
		});
             }
             else 
             {
                 
             }
        }); 
        
     }
    else {
       console.log("internet state : ok!");
    }
});
module.exports = app;
