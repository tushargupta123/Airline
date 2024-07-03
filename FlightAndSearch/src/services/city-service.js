const {CityRepository} = require('../repository/index'); 

const cityRepository = new CityRepository();

class CityService {

    async createCity(data){
        try {
            const city = await cityRepository.createCity(data);
            return city;
        } catch (error) {
            throw {error};
        }
    }

    async deleteCity(cityId){
        try {
            const city = await cityRepository.deleteCity(cityId);
            return city;
        } catch (error) {
            throw {error};
        }
    }

    async updateCity(cityId,data){
        try {
            const city = await cityRepository.updateCity(cityId,data);
            return city;
        } catch (error) {
            throw {error};
        }
    }

    async getCity(cityId){
        try {
            const city = await cityRepository.getCity(cityId);
            return city;
        } catch (error) {
            throw {error};
        }
    }
    async getAllCities(filter){
        try {
            const cities = await cityRepository.getAllCities({name: filter.name});
            return cities;
        } catch (error) {
            throw {error};
        }
    }
}

module.exports = CityService;