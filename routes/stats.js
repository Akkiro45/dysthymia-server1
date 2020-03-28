const express = require('express');
const _ = require('lodash');

const Stats = require('../models/stats');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.post('/post', authenticate, (req, res) => {
  // return res.status(400).send({ msg: 'Under-Mainainance!' });
  const body = _.pick(req.body, ['stats']);
  let resBody = {};
  let error = {};
  Stats.findOne({ userID: req.user._id })
    .then(stats => {
      if(!stats) {
        const statsBody = {
          userID: req.user._id
        }
        stats = new Stats(statsBody);
      }
      Object.keys(body.stats).forEach(key => {
        // if(key === 'activities') {
        //   if(Array.isArray(body.stats[key])) {
        //     // stats[key] = stats[key].concat(body.stats[key]);
        //   } else {
        //     stats[key].push(body.stats[key]);
        //   }
        // } else {
        //   stats[key].push(body.stats[key]);
        // }
        stats[key].push(body.stats[key]);
      });
      stats.save({ checkKeys: false })
        .then(() => {
          resBody.status = 'ok';
          return res.send(resBody);
        })
        .catch((err) => {
          console.log(err)
          throw new Error();
        });
    })
    .catch(err => {
      resBody.status = 'error';
      error.msg = 'Unable to store stats!';
      resBody.error = error;
      return res.status(400).send(resBody);
    });
});

// router.post('/post-one-time', authenticate, (req, res) => {
//   const body = _.pick(req.body, ['stats']);
//   let resBody = {};
//   let error = {};
//   Stats.findOne({ userID: req.user._id })
//     .then(stats => {
//       if(!stats) {
//         const statsBody = {
//           userID: req.user._id
//         }
//         stats = new Stats(statsBody);
//       }
//       Object.keys(body.stats).forEach(key => {
//         if(key === 'activities') {
//           stats[key] = stats[key].concat(body.stats[key]);
//         } else {
//           body.stats[key].forEach(e => {
//             stats[key].push(e);
//           });
//         }
//       });
//       stats.save({ checkKeys: false })
//         .then(() => {
//           resBody.status = 'ok';
//           return res.send(resBody);
//         })
//         .catch((err) => {
//           console.log(err)
//           throw new Error();
//         });
//     })
//     .catch(err => {
//       resBody.status = 'error';
//       error.msg = 'Unable to store stats!';
//       resBody.error = error;
//       return res.status(400).send(resBody);
//     });
// });

router.get('/get', authenticate, (req, res) => {
  let resBody = {};
  let error = {};
  Stats.findOne({ userID: req.user._id })
    .then(stats => {
      // if(stats) {
      //   resBody.data = {
      //     data: stats,
      //     user: _.pick(req.user, ['userName', 'profile'])
      //   };
      //   resBody.status = 'ok';
      // } else {
      //   resBody.status = 'error';
      // }
      resBody.data = {
        data: stats,
        user: _.pick(req.user, ['userName', 'profile'])
      };
      resBody.status = 'ok';
      return res.send(resBody);
    })
    .catch(err => {
      resBody.status = 'error';
      error.msg = 'Unable to find stats!';
      resBody.error = error;
      return res.status(404).send(resBody);
    });
});

router.get('/:type', authenticate, (req, res) => {
  let resBody = {};
  let error = {};
  const pageNumber = parseInt(req.query.pageNumber);
  const pageSize = parseInt(req.query.pageSize);
  const type = req.params.type;
  Stats.findOne({ userID: req.user._id })
    .select({ [type]: 1 })
    .then(stats => {
      const start = (pageNumber - 1) * pageSize;
      const end = pageNumber * pageSize;
      resBody.data = stats[type].reverse().slice(start, end);
      resBody.status = 'ok';
      return res.send(resBody);
    })
    .catch(e => {
      error.msg = 'Not Found!';
      resBody.status = 'error';
      resBody.error = error;
      return res.status(404).send(resBody);
    });
})

// router.post('/rmv/:id', (req, res) => {
//   const id = req.params.id;
//   console.log(id)
//   Stats.findOne({ userID: id })
//     .then(stat => {
//       if(stat) {
//         console.log('Got stats')
//         console.log('start rmving')
//         let activities = [];
//         stat.activities.forEach(a => {
//           if(a.stats) {
//             activities.push(a);
//           }
//         });
//         stat.activities = activities;
//         console.log('start saving')
//         stat.save()
//           .then(() => {
//             console.log('Done')
//           })
//           .catch(e => {
//             console.log(e)
//           })
//       } else {
//         console.log('Not fount')
//       }
//
//     })
// });

module.exports = router;
