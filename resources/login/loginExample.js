var express = require("express");
var router = express.Router();
var functions = require('./utils/functions');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(session({secret: "Your secret key"}));

var Users = [];

router.get('/signup', function(req, res){
   res.render('signup');
});

router.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
               message: "User Already Exists! Login or choose another user id"});
         }
      });
      var newUser = {id: req.body.id, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      res.redirect('/protected_page');
   }
});

router.get('/protected_page', functions.checkSignIn, function(req, res){
   res.render('protected_page', {id: req.session.user.id})
});

router.get('/login', function(req, res){
   res.render('login');
});

router.post('/login', function(req, res){
   console.log(Users);
   if(!req.body.id || !req.body.password){
      res.render('login', {message: "Please enter both id and password"});
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id && user.password === req.body.password){
            req.session.user = user;
            res.redirect('/protected_page');
         }
      });
      res.render('login', {message: "Invalid credentials!"});
   }
});

router.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

router.use('/protected_page', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});
