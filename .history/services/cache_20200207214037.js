const mongoose = require('mongoose');


const exec = mongoose.Query.prototype.exec; // to run exec command when its created

// to understand this you should check advanced nodejs course lesson 54 after 2:30 minutes on udemy


mongoose.Query.prototype.exec = function () {

    console.log(' I am about to run a QUERY');

    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);

   const key =  Object.assign({}, this.getQuery, { // to understand this you should check advanced nodejs course lesson 57 after 1:00 minutes on udemy
        collection: this.mongooseCollection.name

    })
console.log(key)

    return exec.apply(this, arguments);

}