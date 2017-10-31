var express = require('express')
var router = express.Router()
var Yelp = require('yelp-api-v3')

/* GET users listing. */
router.get('/:action', function(req, res, next) {
  
  var actions = ['search']
  var action = req.params.action

  if (actions.indexOf(action) == -1) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource'
    })
  }

  var yelp = new Yelp({
    app_id: process.env.YELP_APP_ID,
    app_secret: process.env.YELP_APP_SECRET
  })

  var params = { term: req.query.term, location: req.query.location }

  yelp.search({ term: req.query.term, location: req.query.location })
  .then(function(data) {
    var parsedData = JSON.parse(data)
    var content = {
      data: parsedData,
      title: params.term + ' in ' + params.location
    }

    res.render('yelp', content)
    // res.json({
    //   confirmation: 'success',
    //   data: content
    // })
  })
  .catch(function(err) {
    res.json({
      confirmation: 'fail',
      message: 'err',
      data: params
    })
  })
})

module.exports = router
