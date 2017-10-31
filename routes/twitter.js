var express = require('express')
var router = express.Router()
var Twitter = require('twitter')

var client = new Twitter({
    consumer_key: 'JgC4F0tlzAAHA14Is7hjFccJa',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: '54285575-g7DJmwkxRIKmJHpAVlxsypqhwbYZykPNzYtBTWmNI',
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
  })

router.get('/', function(req, res, next) {
  
  var username = req.query.username
  if (!username) {
    var search = req.query.search
    if (!search) {
      res.json({
        confirmation: 'fail',
        message: 'No search term or username detected'
      })

      return
    }

    client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
      res.json(tweets)
    })

    return
  }

  var params = { screen_name: username}
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets)
    }

    res.json(tweets)

  })
})

module.exports = router
