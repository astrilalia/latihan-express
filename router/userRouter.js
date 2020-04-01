const express = require('express')
const router = express.Router()
const { userController } = require('../controller/index')
// nyimpen semua endpoint url di API

router.get('/getUsers', userController.getAllUsers)
router.get('/getById/:id', userController.getUserById)
router.get('/search-username', userController.searchByUsername)
router.get('/login', userController.login)
router.get('/getByRole', userController.searchByRole)

module.exports = router