module.exports = {
  googleClientID:
    '964808011168-29vqsooppd769hk90kjbjm5gld0glssb.apps.googleusercontent.com',
  googleClientSecret: 'KnH-rZC23z4fr2CN4ISK4srN',
 // mongoURI: 'mongodb://maximilian:OM7ipCvN0lwWzgZN@cluster0-shard-00-00-wmwee.azure.mongodb.net:27017,cluster0-shard-00-01-wmwee.azure.mongodb.net:27017,cluster0-shard-00-02-wmwee.azure.mongodb.net:27017/stephanblog?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  mongoURI:'mongodb://127.0.0.1:27017/blog_ci',  // default mongodb adress on Travis CI
  cookieKey: '123123123',
  redisUrl : 'redis://127.0.0.1:6379'
};
