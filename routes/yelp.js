var express = require('express')
var router = express.Router()
var Yelp = require('yelp-api-v3')

router.get('/:action', function(req, res, next) {
  
  var actions = ['search', 'venue']
  var action = req.params.action
  var format = req.query.format
  if (format == null)
    format = "html"

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

  // action is venue
  if (action == 'venue') {
    var id = req.query.id

    yelp.business(id)
    .then(function(data) {
      var parsedData = JSON.parse(data)
      console.log(parsedData) 
      if (format == 'json')
        res.json(parsedData)
      else
        res.render(action, parsedData)
    })
    .catch(function(err) { 
      console.log(err)
      res.render('error', err) 
    })

    // var data = {
    //   venue: id
    // }

    // res.render(action, data)
    
    return
  }


  // action is search
  var params = { term: req.query.term, location: req.query.location }

  yelp.search({ term: req.query.term, location: req.query.location })
  .then(function(data) {
    var parsedData = JSON.parse(data)
    var content = {
      data: parsedData,
      title: params.term + ' in ' + params.location
    }

    if (format == 'json') {
      res.json(parsedData)

      return
    }

    res.render('yelp', content)
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
