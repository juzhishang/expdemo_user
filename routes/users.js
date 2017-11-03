var express = require('express');
var router = express.Router();
var userList = require('../data/users.json')
var notLogin = require('./notLogin.js')

function findUser(name) {
  var u = userList.find((val) => {
    return val.username === name
  })
  return u || ''
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/index', {title: '用户列表', list: userList})
});

router.get('/new', notLogin, function(req, res, next) {
  res.render('user/new', { title: '新增用户'})
})

router.post('/new',notLogin, function(req, res) {
  var data = req.body
  var exist = findUser(data.username)
  if (exist) {
    res.send('Conflict', 409)
  } else {
    data.id = new Date().getTime()
    data.password = "123456"
    userList.push(data)
    res.redirect('/users')
  }
})

router.post('/delete/:id', notLogin, function(req, res, next) {
  var id = Number(req.params.id)
  if (id !== req.session.user.id) {
    res.send('Unauthorized', 401)
  } else {
    var index = userList.findIndex((u) => {
      return u.id === id
    })
    if (index > -1) {
      userList.splice(index, 1)
    }
    res.redirect('/users')
  }
})

router.get('/:name', function(req, res, next) {
  var u = findUser(req.params.name)
  if (u) {
    res.render('user/profile', {title: 'user profile', user: u})
  } else {
    res.send('not found', 404)
  }
})

module.exports = router;
