const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  pub.get_restaurants = function (req, res) {
    Restaurant.find({})
      .exec((err, restaurants) => {
        if (err) res.send({error: errors.generic})
        else {
          res.send(restaurants)
        }
      })
  }

  return pub
}
