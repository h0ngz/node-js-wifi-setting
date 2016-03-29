var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;


/* GET users listing. */
router.post('/setting', function(req, res, next) {

    var action = req.param('action');
    if(action==="connect")
    {
        var ssid = req.param('ssid');
        var pass = req.param('pass');
        
        var file = '/home/pi/temp-files/wpa_supplicant.conf';
        
        var config = '# Auto network setting\n\n';
            config += 'ctrl_interface=/var/run/wpa_supplicant\n';
            config += 'ctrl_interface_group=0\n';
            config += 'update_config=1\n';
            config += 'eapol_version=1\n\n';

            config += 'network={\n';
            config += '        ssid="'+ssid+'" \n';
            config += '        psk="'+pass+'"\n';
            config += '        proto=WPA2\n';
            config += '        key_mgmt=WPA-PSK\n';
            config += '        pairwise=CCMP\n';
            config += '        group=CCMP\n';
            config += '        priority=0\n';
            
            config += '} \n';
            
        fs.open(file, 'w', function(err, fd) {
            if (err) throw err;
            console.log('file open complete');

            fs.writeFile(file, config, 'utf-8', function(error){
                console.log('write end')
                
            });
        });

        var child = exec("sudo /home/pi/rasp-simple-wifi-client-ap-switcher/wifiClientMode ", function (error, stdout, stderr) {
            if (error) throw err;
            console.log('shell call end')
        });
        
        res.send('ok');
    }
    

});

module.exports = router;

