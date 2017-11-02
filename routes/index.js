var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/:page', function(req, res, next) {

  var query = req.body.query
  var type = req.body.type

  var url = '/twitter/search?term='+ query
  res.redirect(url)

})

module.exports = router
