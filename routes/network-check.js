var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;

var jsonObj = {
    status:{
        ip_info:"null",
        mode_info:"null",
        internet_info:"null"
    }
};


/* GET users listing. */
router.get('/check', function(req, res, next) {
       
    /* server status */
    var ip = require('os').networkInterfaces()
    // var ip = require('os').networkInterfaces().eth0[ 0].address; 

    jsonObj.status.ip_info = ip;
    
    
    /* Mode check */
    fs.readFile('/home/pi/temp-files/mode','utf8', function(err, data) {
        var info = "";
        var word = data.substr(0,2);
        if(word==='WI') {
            console.log('WIFI MODE');
            info = "WIFI";  
        } else {             
            console.log('AP MODE');
             info = "AP"; 
        }
         jsonObj.status.mode_info = info;
    });
    
    /* internet connect check */
    require('dns').resolve('www.google.com', function(err, addr){
        var info = "";
        if (err) {
            console.log('INTERNET CONNECT');
            info = "CONNECT"      
        } else {
            console.log('INTERNET NOT CONNECT');
           info = "NOT CONNECT"         
        } 
        jsonObj.status.internet_info = info;
    });
    
    
    
    res.writeHead(200);
    res.end(JSON.stringify(jsonObj));   
});

module.exports = router;

