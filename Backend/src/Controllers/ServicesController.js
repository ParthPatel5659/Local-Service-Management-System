const ServicesSchema = require('../Models/ServicesModel');

const getAllService = async (req, res) => {
    try {
        const findService = await ServicesSchema.find()
        res.json({
            message: "All Service Get Success Fully",
            data: findService
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }   
}

const addService = async (req, res) => {
    const addedService = await ServicesSchema.create(req.body);
    try {
        res.status(201).json({
            message: "Service Added Successfully",
            data: addedService
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    addService,
    getAllService
}