const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
console.log()

  MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-huh2k.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
  .then(client => {
    console.log('*** MongoDB connected *** ')
    _db = client.db()
    callback() 
  })
  .catch(err => {
    console.log(err)
    throw err
  })
}

const getDb = () => {
  if (_db) return _db
  throw Error('No database found')
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb


/*
mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-huh2k.gcp.mongodb.net/test?retryWrites=true

*/

