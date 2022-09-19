const route=require('express').Router()
const controller=require('../controller')


route.post("/login",controller.login)
route.post("/register",controller.rigister)
route.put('/forgot',controller.forgot)

module.exports=route;