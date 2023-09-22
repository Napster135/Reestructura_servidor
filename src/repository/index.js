// const { UserRepository } = require ( "./users.repository.js";
// const { contactsDao } = require ( "../dao/factory.js"

// export const contactService = new UserRepository(contactsDao)



const ProductRepository  = require ( "./productsRepository.js")
const ProductManager = require ( "../Dao/managers/ProductManager.js")
const CartRepository = require ( "./cartsRespository.js")
const CartManager = require ( "../Dao/managers/CartManager.js")

const productService = new ProductRepository(new ProductManager());
const cartService = new CartRepository(new CartManager());


module.exports = index;