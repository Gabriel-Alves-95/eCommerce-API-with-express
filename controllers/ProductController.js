const Product = require('../models/Product');
const { Op } = require('sequelize');

class ProductController {

    async getProducts(params) {

        try {

            let result;

            if ( params.q ) {
                
                result = await Product.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${params.q.toLowerCase()}%`                            
                        }
                    }
                });                

            } else {
                result = await Product.findAll();
            }

            if ( result.length !==0 ) {

                return( 
                    {
                        status: 200,                        
                        result: result                        
                    }
                );

            }

            return( 
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

    async getProduct(id) {

        try{

            const result = await Product.findByPk(id);

            if ( result ) {

                return(
                    {
                        status: 200,
                        result: result
                    }
                );

            }

            return(
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

    async createProduct(data) {

        try {

            const product = await Product.create(data);

            return (
                {
                    status: 200,
                    result: `Product ${product.id} successfully created.`
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

    async updateProduct(id, data) {

        try {

            await Product.update(data, {
                where: {
                    id: id,
                }
            });

            return (
                {
                    status: 200,
                    result: `Product ${id} updated successfully.`
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

    async deleteProduct(id) {

        try {

            await Product.destroy({
                where: {
                    id: id
                }
            });

            return(
                {
                    status: 200,
                    result: "Product successfully deleted."
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

};

module.exports = ProductController;


