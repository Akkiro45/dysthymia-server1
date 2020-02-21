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

// mongodb://localhost:27017/DysthymiaApp
// mongodb+srv://Dysthymia:Dysthymia101@cluster0-8tmy8.mongodb.net/test?retryWrites=true&w=majority
