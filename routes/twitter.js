var express = require('express')
var router = express.Router()
var Twitter = require('twitter')

router.get('/', function(req, res, next) {
  
  var client = new Twitter({
    consumer_key: 'JgC4F0tlzAAHA14Is7hjFccJa',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: '54285575-g7DJmwkxRIKmJHpAVlxsypqhwbYZykPNzYtBTWmNI',
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
  })

  var params = { screen_name: 'nodejs'}
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets)
    }

    res.json(tweets)

  })
})

module.exports = router
