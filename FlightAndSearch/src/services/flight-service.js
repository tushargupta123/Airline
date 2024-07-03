const {FlightRepository,AirplaneRepository} = require('../repository/index');
const {compareTime} = require('../utils/helper');

class FlightService {

    constructor(){
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data){
        try {
            if(!compareTime(data.arrivalTime,data.departureTime)){
                throw {error: "arrival time cannot be less than departure time"};
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({...data,totalSeats:airplane.capacity});
            return flight;
        } catch (error) {
            throw {error};
        }
    }

    async getAllFlightData(data){
        try {
            const flights = await this.flightRepository.getAllFlights(data);
            return flights;
        } catch (error) {
            throw {error};
        }
    }
    async getFlight(fligthId){
        try {
            const flight = await this.flightRepository.getFlight(fligthId);
            return flight;
        } catch (error) {
            throw {error};
        }
    }
    async updateFlight(fligthId,data){
        try {
            const flight = await this.flightRepository.updateFlights(fligthId,data);
            return flight;
        } catch (error) {
            throw {error};
        }
    }
}

module.exports = FlightService;