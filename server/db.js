const {MongoClient} = require('mongodb')

const URL = "mongodb://localhost:27017/usersbox"

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(URL).then((client) => {
            console.log('connected to MongoDB')
            dbConnection = client.db()
            return cb()
        }).catch((err) => console.log(err))
    },
    getDb: () => dbConnection,
}
