const { GET_RAFFLE , REGISTER_RAFFLE , EDIT_RAFFLE , DELETE_RAFFLE , RAFFLES_SELLERS} = require('../global/_var.js')

// Dependencies
const express = require('express')
const router = express.Router()

// Controllers
const dataController = require('../controllers/getInfo.controller.js')
const saveController = require('../controllers/saveInfo.controller.js')

// Routes
router.get(GET_RAFFLE , dataController.getRaffles)

router.get(RAFFLES_SELLERS , dataController.getRaffleSellers)

router.post(REGISTER_RAFFLE , saveController.regRaffle)

router.post(EDIT_RAFFLE , saveController.editRaffle)

router.post(DELETE_RAFFLE , saveController.deleteRaffle)

module.exports = router
