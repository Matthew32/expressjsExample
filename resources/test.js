var express = require("express");
var router = express.Router();

router.get("/:name/:id", function(req, res) {
  res.send("id: " + req.params.id + " and name: " + req.params.name);
});
//get info from form
router.post("/", function(req, res) {
  console.log(req.body);
  res.send("recieved your request!");
});
//404 error
//Other routes here
router.get("*", function(req, res) {
  res.send("Sorry, this is an invalid URL.");
});
//delete example  getting from database
router.delete("/people/:id", function(req, res) {
  Person.findByIdAndRemove(req.params.id, function(err, response) {
    if (err)
      res.json({ message: "Error in deleting record id " + req.params.id });
    else res.json({ message: "Person with id " + req.params.id + " removed." });
  });
});
//export this router to use in our index.js
module.exports = router;
