const {FlightService} = require('../services/index');
const flightService = new FlightService();

const create = async(req,res) => {
    try {
        const flight = await flightService.createFlight(req.body);
        return res.status(200).json({
            data : flight,
            success : true,
            message: 'Successfully created a flight',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message: 'Something went wrong',
            err: error
        })
    }
}

const getAll = async(req, res) => {
    try {
        const flight = await flightService.getAllFlightData(req.query);
        return res.status(200).json({
            data : flight,
            success : true,
            message: 'Successfully fetched the flights',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message: 'Something went wrong',
            err: error
        })
    }
}

const get = async(req, res) => {
    try {
        const flight = await flightService.getFlight(req.params.id);
        return res.status(200).json({
            data : flight,
            success : true,
            message: 'Successfully fetched the flight',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message: 'Something went wrong',
            err: error
        })
    }
}
const update = async(req, res) => {
    try {
        const flight = await flightService.updateFlight(req.params.id,req.body);
        return res.status(200).json({
            data : flight,
            success : true,
            message: 'Successfully updated the flight',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message: 'Something went wrong',
            err: error
        })
    }
}

module.exports = {
    create,getAll,get,update
}