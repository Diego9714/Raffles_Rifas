const Raffles = require('../models/raffles.js')
// const { handleCombinedUpload , setCustomFileName} = require('../utils/image-setup.js')
// const fs = require('fs')
// const path = require('path')

const controller = {}

// ----- Save Raffle -----
controller.regRaffle = async (req, res) => {
  try {
    const { raffles } = req.body;

    const filterRaffle = Object.keys(raffles)

    if (filterRaffle.length > 0) {
      let verify = await Raffles.verifyRaffle(raffles)

      const regRaffles = verify.info.regRaffle
      const raffleExists = verify.info.raffleExists

      if (regRaffles.length > 0) {
        const infoRaffle = await Raffles.regRaffle(regRaffles)

        let registeredRaffles = infoRaffle.completed.map(raffle => raffle.raffle)
        let existingRaffles = raffleExists.map(raffle => raffle.name_raffle)
        
        // for (const raffle of regRaffles) {
        //   console.log(raffle)
        //   const customFileName = `${raffle.name_raffle}`
        //   setCustomFileName(customFileName)
        //   await handleCombinedUpload(raffle, req, res)
        // }
        
        res.status(infoRaffle.code).json({
          message: "Registration process completed",
          status: true,
          code: infoRaffle.code,
          registeredRaffles: registeredRaffles,
          existingRaffles: existingRaffles,
          notRegisteredRaffles: infoRaffle.notCompleted
        })
      } else {
        res.status(500).json({ message: "All raffles are already registered", status: false, code: 500 })
      }
    } else {
      res.status(400).json({ message: "No raffles provided in the request", status: false, code: 400 })
    }
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
    console.log(error)
  }
}

// ----- Edit Raffle -----
controller.editRaffle = async (req, res) => {
  try {
    const { raffles } = req.body

    userRaffle = await Raffles.editRaffle(raffles)
    console.log(userRaffle)
    res.status(userRaffle.code).json(userRaffle)
  
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

// ----- Delete Raffle -----
controller.deleteRaffle = async (req, res) => {
  try {
    const data = {id_raffle , activation_status } = req.params

    userRaffle = await Raffles.deleteRaffle(data)
    res.status(userRaffle.code).json(userRaffle)
  
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
