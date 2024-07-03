const {Op} = require('sequelize');

const {City} = require('../models/index');


class CityRepository {
    async createCity({name}){
        try{
            const city = await City.create({name});
            return city;
        }catch(error){
            throw {error};
        }
    }

    async deleteCity(cityId){
        try{
            await City.destroy({
                where: {
                    id: cityId
                }
            })
            return true;
        }catch(error){
            throw {error};
        }
    }

    async updateCity(cityId, data){
        try {

            // this will only update the data

            // const city = await City.update(data, {
            //     where: {
            //         id: cityId
            //     }
            // })

            // this will update and show the changes also but in this we will have to particularly change each attribute

            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        } catch (error) {
            throw {error};
        }
    }

    async getCity(cityId){
        try{
            const city = await City.findByPk(cityId);
            return city;
        }catch(error){
            throw {error}; 
        }
    }

    async getAllCities(filter){      // filter can be empty also
        try{

            // to get filtered cities with prefix
            if(filter.name){
                const cities = await City.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                })
                return cities;
            }

            const cities = await City.findAll();
            return cities;
        }catch(error){
            throw {error}; 
        }
    }
}

module.exports = CityRepository;