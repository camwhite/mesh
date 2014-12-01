'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Get list of non-admin users
 */
exports.standard = function(req, res) {
  User.find({role: 'user'}, '-salt -hashedPassword -role -provider').populate('contacts', '-salt -hashedPassword').exec(function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Add a contact
 */
exports.addContact = function(req, res, next) {
  var userId = req.user._id;
  var contact = req.body;
  contact._id = mongoose.Types.ObjectId(contact._id);
console.log(contact);
  User.findById(userId, function (err, user) {
    user.contacts.push(contact);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
  User.findById(contact._id, function (err, user) {
    user.contacts.push(req.user);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};


var findMe = function (req, res, next, callback) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword').populate('contacts', '-salt -hashedPassword').exec(function(err, user) { // don't ever give out the password or salt
  if (err) return next(err);
  if (!user) return res.json(401);
  callback(user);
});
}
/**
* Remove a contact
*/
exports.removeContact = function(req, res, next) {
  var userId = String(req.user._id);
  var contactId = req.params.id;
  findMe(req, res, next, function (user) {
    user.contacts.pull(contactId);
    user.save();
    res.json(user.contacts);
  });
  // User.update({_id: mongoose.Types.ObjectId(userId)}, {$pull: {"contacts": mongoose.Types.ObjectId(contactId)}});
  // console.log('db.users.update({_id: ObjectId("'+userId+'")},{$pull: {"contacts": ObjectId("'+contactId+'")}});');
  // console.log(userId);
};


//db.articles.update({"tags.text": "tag-1"},{$pull: {"tags": {text: "tag-1"}}}, {multi: true})

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  findMe(req, res, next, function (user) {
    res.json(user);
  });
  // User.findOne({
  //   _id: userId
  // }, '-salt -hashedPassword').populate('contacts', '-salt -hashedPassword').exec(function(err, user) { // don't ever give out the password or salt
  //   if (err) return next(err);
  //   if (!user) return res.json(401);
  //   res.json(user);
  // });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
