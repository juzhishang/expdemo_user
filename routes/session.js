var express = require('express')
var router = express.Router()
var userList = require('../data/users.json')

router.get('/login', function(req, res) {
    res.render('session/login', { title: '登录'})
})

router.post('/login', function(req, res) {
    var user = req.body
    var findUser = userList.find((item) => {
        return item.username === user.username
    })
    if (findUser && findUser.password === user.password) {
        req.session.user = { name: user.username, id: findUser.id }
        res.redirect('/users')
    } else {
        res.redirect('/session/login')
    }
})
router.post('/logout', function(req, res) {
    console.log(req.session)
    req.session = null
    res.redirect('/session/login')
})
module.exports = router

