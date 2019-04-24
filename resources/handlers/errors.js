var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
    //Create an error and pass it to the next function
    var err = new Error("Something went wrong");
    next(err);
 });
 
 /*
  * other route handlers and middleware here
  * ....
  */
 
 //An error handling middleware
 router.use(function(err, req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong.")
 });
 router.get("*", function(req, res) {
    res.send("Sorry, this is an invalid URL.");
  });
 //Routes will go here
module.exports = router;