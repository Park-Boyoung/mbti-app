const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_URI_ATLAS =
  'mongodb+srv://boyoung:7167@cluster0.uae2ehq.mongodb.net/?retryWrites=true&w=majority';
const uri = DB_URI_ATLAS;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
module.exports = client;
