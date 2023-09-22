const { dbConnection } = require ( "../config/dbconnection.js")
//const { UserMongo } = require ( "./managers/";
const ProductManager = require ( './managers/ProductManager.js')
const { CartManager } = require('./managers/CartManager.js')
const index = require('./repository/index');


dbConnection()
//export const userDao = new UserMongo();
 const productManager = new ProductManager()
 const cartManager = new CartManager()

 module.exports =  index; 
