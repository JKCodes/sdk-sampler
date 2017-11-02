var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/:page', function(req, res, next) {
  console.log(JSON.stringify(req.body))

  res.json(req.body)
})

module.exports = router
