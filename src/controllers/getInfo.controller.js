const Raffles = require('../models/raffles.js')

const controller = {}

controller.getRaffles = async (req, res) => {
  try {
    const data = { id_boss } = req.params
    const user  = await Raffles.getRaffle(data)
    res.status(user.code).json(user)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

controller.getRaffleSellers = async (req, res) => {
  try {
    const data = { id_seller } = req.params
    const user  = await Raffles.getRaffleSeller(data)
    res.status(user.code).json(user)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
