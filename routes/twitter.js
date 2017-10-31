var express = require('express')
var router = express.Router()
var Twitter = require('twitter')

function getClient() {
  var client = new Twitter({
    consumer_key: 'JgC4F0tlzAAHA14Is7hjFccJa',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: '54285575-g7DJmwkxRIKmJHpAVlxsypqhwbYZykPNzYtBTWmNI',
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
  })

  return client
}

router.get('/:action', function(req, res, next) {
  
  var action = req.params.action
  if (action == 'timeline') {
    var username = req.query.username
    var client = getClient()

    if (!username) {
      res.json({
        confirmation: 'fail',
        message: 'No username detected'
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
  }

  if (action == 'search') {
    var term = req.query.term
    var client = getClient()

    if (!term) {
      res.json({
        confirmation: 'fail',
        message: 'No term detected'
      })

      return
    }

    client.get('search/tweets', {q: term}, function(error, tweets, response) {
      res.json(tweets)
    })

    return
  }
  
})

module.exports = router
