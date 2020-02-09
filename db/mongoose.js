const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB Server!');
  })
  .catch(e => {
    console.log(e);
    console.log('Unable to Connect MongoDB Server! \n', e);
  });

module.exports = {
  mongoose
}
// "MONGODB_URI": "mongodb+srv://Dysthymia:Dysthymia101@cluster0-8tmy8.mongodb.net/test?retryWrites=true&w=majority",
// "MONGODB_URI": "mongodb://localhost:27017/DysthymiaApp",
// mongodb://Dysthymia:Dysthymia101@cluster0-shard-00-00-8tmy8.mongodb.net:27017,cluster0-shard-00-01-8tmy8.mongodb.net:27017,cluster0-shard-00-02-8tmy8.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
