const User = require("../models/User");
const { Op } = require("sequelize");

class UserController {

    async getUsers(params) {

        try {

            let result;

            if ( params.q ) {

                result = await User.findAll({
                    where: {

                        [Op.or]: {

                            name: {
                                [Op.like]: `%${params.q.toLowerCase()}%`
                            },

                            email: {
                                [Op.like]: `%${params.q.toLowerCase()}%`
                            },

                            username: {
                                [Op.like]: `%${params.q.toLowerCase()}%`
                            }

                        }

                    }
                });

            } else {
                result = await User.findAll();
            }

            if ( result.length !== 0 ) {

                return (
                    {
                        status: 200,
                        result: result
                    }
                );

            }

            return (
                {
                    status: 200,
                    result: "No results found."
                }
            );

        } catch(err) {

            return (
                {
                    status: 500,
                    result: "A generic error has occurred. Please, contact the system admin. Error info: " + err.toString()
                }
            );

        }

    }

    async getUser(id) {

        try {

            const result = await User.findByPk(id);

            if ( result ) {

                return (
                    {
                        status: 200,
                        result: result
                    }
                );

            }

            return (
                {
                    status: 200,
                    result: "No results found."
                }
            );

        } catch(err) {

            return(
                {
                    status: 500,
                    result: "A generic error has occurred. Please, contact the system admin. Error info: " + err.toString()
                }
            );

        }

    }

    async createUser(data) {

        try {

            const result = await User.create(data);

            return(
                {
                    status: 200,
                    result: `User ${result.id} successfully created.`
                }
            );

        } catch(err) {

            return(
                {
                    status: 500,
                    result: "A generic error has occurred. Please, contact the system admin. Error info: " + err.toString()
                }
            );

        }

    }

    async updateUser(id, data) {

        try {

            await User.update(data, {
                where: {
                    id: id
                }
            });

            return (
                {
                    status: 200,
                    result: `User ${id} successfully updated.`
                }
            );

        } catch(err) {

            return (
                {
                    status: 500,
                    result: "A generic error has occurred. Please, contact the system admin. Error info: " + err.toString()
                }
            );

        }

    }

    async login(data) {

        try {

            const result = await User.findAll({
                where: {
                    [Op.or]: {

                        email: data.email_or_username,

                        username: data.email_or_username

                    }
                },
                plain: true
            });            

            if ( (!result) || (result.password !== data.password) ) {
                
                return (
                    {
                        result: 200,
                        result: "Incorrect password or user info."
                    }
                );

            }

            return (
                {
                    status: 200,
                    result: `Welcome back, ${result.name}! You are logged in.`                   
                }
            );

        } catch(err) {

            return(
                {
                    status: 500,
                    result: "A generic error has occurred. Please, contact the system admin. Error info: " + err.toString()
                }
            );

        }

    }

};

module.exports = UserController;

