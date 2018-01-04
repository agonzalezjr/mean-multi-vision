var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course');

mongoose.Promise = global.Promise;
  
module.exports = function(config) {
 
  mongoose.connect(config.db, {
    useMongoClient: true
  }).then(function(db) {
    console.log(`multivision db opened! (${config.db})`);
  }).catch(function(err) {
    console.error(`connection error ... ${err}`);
  });

  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
};
