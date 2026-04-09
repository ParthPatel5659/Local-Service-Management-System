const Support = require("../Models/SupportModel")

// Create request
const createSupport = async (req, res) => {
  try {
    const support = await Support.create(req.body)

    res.status(201).json({
      message: "Support created",
      data: support
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createSupport }