const mongoose = require('mongoose');


const exec = mongoose.Query.prototype.exec; // to understand this you should check advanced nodejs course lesson 54 after 2:30 minutes on udemy


mongoose.Query.prototype.exec = function () {

    console.log(' I am about to run a QUERY');

    console.log(this.getQuery());
    console.log(this.mongooseCollection.name);

    return exec.apply(this, arguments);

}