var express = require('express')
var router = express.Router()
var Twitter = require('twitter')

router.get('/:action', function(req, res, next) {
  
  var actions = ['timeline', 'search']
  var action = req.params.action
  
  if (actions.indexOf(action) == -1) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource'
    })
  }

  var client = new Twitter({
    consumer_key: 'JgC4F0tlzAAHA14Is7hjFccJa',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: '54285575-g7DJmwkxRIKmJHpAVlxsypqhwbYZykPNzYtBTWmNI',
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
  })

  var params = null
  var path = null

  if (action == 'timeline') {
    params = { screen_name: req.query.username }
    path = 'statuses/user_timeline'
  }

  if (action == 'search'){
    params = {q: req.query.term }
    path = 'search/tweets'
  }

  client.get(path, params, function(error, tweets, response) {
    if (error != null) {
      res.render('twitter', {tweets: [{'text': 'No tweets found'}]})
      console.log(error)

      return
    }

    if (action == 'timeline')
      res.render('twitter', {tweets: tweets})
    
    if (action == 'search')
      res.render('twitter', {tweets: tweets.statuses})

    // res.json({ tweets: tweets})

  })
})

module.exports = router
