const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req,res) => {
    try {
        const response = await userService.create({
            email:req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "successfully created a new user",
            success: true,
            data:response,
            err: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        })
    }
}

const signIn = async(req,res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            message: "successfully logged in",
            success: true,
            data:response,
            err: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        })
    }
}

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            message: "User is authenticated",
            success: true,
            data:response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            message: "successfully fetched whether user is admin or not",
            success: true,
            data:response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}


module.exports = {
    create,signIn,isAuthenticated,isAdmin
}