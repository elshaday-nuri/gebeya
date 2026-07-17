const db = require("../config/db");


const Product = {


    getAll: (callback) => {

        const sql = `
        SELECT 
            products.id,
            products.name,
            products.description,
            products.price,
            products.stock,
            products.image,
            categories.name AS category

        FROM products

        LEFT JOIN categories

        ON products.category_id = categories.id
        `;


        db.query(sql, callback);

    },



    getById: (id, callback) => {


        const sql = `
        SELECT 
            products.id,
            products.name,
            products.description,
            products.price,
            products.stock,
            products.image,
            categories.name AS category

        FROM products

        LEFT JOIN categories

        ON products.category_id = categories.id

        WHERE products.id = ?
        `;


        db.query(
            sql,
            [id],
            callback
        );

    }


};


module.exports = Product;