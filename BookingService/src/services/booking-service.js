const {BookingRepository} = require('../repository/index');
const axios = require('axios');

const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');

class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            let getflightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const flight = await axios.get(getflightRequestUrl);
            let fligthData = flight.data.data;
            let priceOfTheFlight = fligthData.price;
            if(data.noOfSeats > fligthData.totalSeats){
                throw new ServiceError('Something went wrong in booking process','Insufficient seats in the flight');
            }
            const totalCost = priceOfTheFlight*data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateflightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${booking.flightId}`;
            await axios.patch(updateflightRequestUrl,{totalSeats: fligthData.totalSeats-booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id,{status: "Booked"});
            return finalBooking;
        } catch (error) {
            if(error.name === 'RepositoryError' ||error.name === 'ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;