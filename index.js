var express = require('express');
var path = require('path');

module.exports = function(app) {
    app.use('/public', express.static(path.join(__dirname, '/public')));
    app.get('/home', function(req, res) {
        res.sendFile(path.join(__dirname, '/public/home.html'));
    });


    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '/public/login.html'));
    });
    
    app.get('/dashboard', function(req, res) {  
       res.sendFile(path.join(__dirname, '/public/dashboard.html'));
    });
    
    app.get('/changepassword', function(req, res) {  
       res.sendFile(path.join(__dirname, '/public/changePassword.html'));
    });
    
    app.get('/terms', function(req, res) {  
       res.sendFile(path.join(__dirname, '/public/terms.html'));
    });
}