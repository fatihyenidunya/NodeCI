const query = Person
    .find({ occupation: /host/ })
    .where('name.last').equals('Ghost')
    .where('age').gt(17).lt(66)
    .where('likes').in(['vaporizing', 'talking'])
    .limit(10)
    .sort('-occupation')
    .select('name occupation');



query.exec = function () {

    const result = client.get('query key')
    if (result) {
        return result;
    }

    const result = runTheOriginalExecFunction();

    client.set('query key', result);

    return result;

}



//query.exec((err, result) => console.log(result));

//Same as...

//query.then(result => console.log(result));

//Same as...

//const result = await query;