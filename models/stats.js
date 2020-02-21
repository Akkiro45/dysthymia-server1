const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  unlocks: [
    {
      date: { type: String },
      count: { type: Number }
    }
  ],
  stepCounter: [
    {
      date: { type: String },
      steps: { type: Number }
    }
  ],
  screenOnTime: [
    {
      date: { type: String },
      time: { type: Number }
    }
  ],
  notifications: [
    {
      date: { type: String },
      count: { type: Number },
      clickedCount: { type: Number },
      apps: { type: mongoose.Schema.Types.Mixed },
      clicked: { type: mongoose.Schema.Types.Mixed }
    }
  ],
  headsetPlug: [
    {
      date: { type: String },
      count: { type: Number }
    }
  ],
  activities: [
    {
      date: { type: String },
      stats: { type: mongoose.Schema.Types.Mixed }
    }
  ],
  lightSensor: [
    {
      date: { type: String },
      stats: { type: mongoose.Schema.Types.Mixed }
    }
  ],
  callStats: [
    {
      date: { type: String },
      stats: { type: mongoose.Schema.Types.Mixed }
    }
  ],
  usageStats: [
    {
      date: { type: String },
      stats: { type: mongoose.Schema.Types.Mixed }
    }
  ]
});

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = Stats;
