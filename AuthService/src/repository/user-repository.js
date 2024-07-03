const { StatusCodes } = require('http-status-codes');
const {User,Role} = require('../models/index');
const { ClientError } = require('../utils/client-error');
const { ValidationError } = require('../utils/validation-error');

class UserRepository{
    
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            throw {error};
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user;
        } catch (error) {
            throw {error};
        }
    } 

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email:userEmail
                }
            })
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'The entered email does not exist',
                    'Please enter a valid email address',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            throw {error};
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            })
            return user.hasRole(adminRole);    // hasRole is one of function which are used in many to many associations
        } catch (error) {
            throw {error};
        }
    }

}

module.exports = UserRepository;