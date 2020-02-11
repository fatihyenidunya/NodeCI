const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');



const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec; // to run exec command when its created

// to understand this you should check advanced nodejs course lesson 54 after 2:30 minutes on udemy


mongoose.Query.prototype.cache = function (options = {}) {

    this.useCache = true;
    this.hashKey = options.key;
    return this;

}



mongoose.Query.prototype.exec = async function () {

    //console.log(' I am about to run a QUERY');

    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);

    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), { // to understand this you should check advanced nodejs course lesson 57 after 1:00 minutes on udemy
        collection: this.mongooseCollection.name

    }));
    // console.log(key);

    const cacheValue = await client.get(key);

    if (cacheValue) {
        //console.log(this);

        const doc = JSON.parse(cacheValue);

        return Array.isArray(doc) // to understand this you should check advanced nodejs course lesson 62 after 1:30 minutes on udemy

            ? doc.map(d => new this.model(d))
            : new this.model(doc);

        // // like this

        // new Blog({
        //     title:'Hi',
        //     content:'There'
        // })


    }

    const result = await exec.apply(this, arguments);

    client.set(key, JSON.stringify(result), 'EX', 10); // EX for expiration , 10 means 10 seconds

    return result;

}