const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');


const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec; // to run exec command when its created

// to understand this you should check advanced nodejs course lesson 54 after 2:30 minutes on udemy


mongoose.Query.prototype.cache = function (options = {}) {

    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
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

    const cacheValue = await client.hget(this.hashKey, key);

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

    //client.hset(key, JSON.stringify(result), 'EX', 10); // EX for expiration , 10 means 10 seconds
    client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

    //  client.hset(this.hashKey, key, JSON.stringify(result));
    //  client.expire(this.hashKey, 10);

    return result;

}


module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}