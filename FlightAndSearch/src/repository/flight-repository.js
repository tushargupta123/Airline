const {Fligths} = require('../models/index');
const {Op} = require('sequelize');

class FlightRepository{

    #createFilter(data){            // using hash make it private
        let filter = {};
        if(data.arrivalAirportId){
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if(data.departureAirportId){
            filter.departureAirportId = data.departureAirportId;
        }


        // this will only enable us to create filter for only one price

        if(data.minPrice){
            Object.assign(filter,{price :{[Op.gte]: data.minPrice}});
        }
        if(data.maxPrice){
            Object.assign(filter,{price :{[Op.lte]: data.maxPrice}});
        }

        if(data.minPrice && data.maxPrice){
            Object.assign(filter,{[Op.and]: [{price: {[Op.lte]: data.maxPrice}},{price: {[Op.gte]: data.minPrice}}]});
        }
        return filter;
    }

    async createFlight(data){
        try{
            const flight = await Fligths.create(data);
            return flight;
        }catch(e){
            throw {e};
        }
    }
    async getFlight(flightId){
        try {
            const flight = await Fligths.findByPk(flightId);
            return flight;
        } catch (error) {
            throw {error};
        }
    }
    async getAllFlights(filter){
        try {
            const filterObject = this.#createFilter(filter);
            const flight = await Fligths.findAll({
                where: filterObject
            });
            return flight;
        } catch (error) {
            throw {error};
        }
    }

    async updateFlights(flightId,data){
        try {
            await Fligths.update(data,{
                where:{
                    id: flightId
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = FlightRepository;