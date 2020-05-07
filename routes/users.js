var express = require('express');
var router = express.Router();
const _service = require("../services/userService");

router.post('/validate', function(req, res, next) {
  _service.ValidateUser(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/create', function(req, res, next) {
  _service.CreateUser(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/update', function(req, res, next) {
  _service.UpdateUser(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/get-profile-by-userId', function(req, res, next) {
  console.log(req.body);
  _service.GetUserProfile(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/delete', function(req, res, next) {
  _service.DeleteUser(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/get-all-companies', function(req, res, next) {
  _service.GetALlCompanies(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

module.exports = router;
