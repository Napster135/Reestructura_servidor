const { productService } = require( "../repository/index.js")
const { cartService }  = require ("../repository/index.js")
const ManagerAccess  = require ("../Dao/managers/ManagerAccess.js")


class  viewsController{
  constructor () {
    this.service = new ManagerAccess()

  }

 

 getProductsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const sort = parseInt(req.query.sort) || 0;
    const page = parseInt(req.query.page) || 1;
    const queryParam = req.query.query || null;

    const query = {};

    if (queryParam !== null) {
      query["$or"] = [{ category: { $regex: queryParam, $options: "i" } }];
    }

    const options = {
      limit,
      page,
      lean: true,
    };

    if (sort !== 0) {
      options.sort = { price: sort };
    }

    const result = await productService.getProducts(query, options);

    console.log("Productos obtenidos:", result.docs);

    res.render("home", {
      products: result.docs,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      prevPage: result.prevPage,
      prevLink: result.prevLink,
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage,
      nextLink: result.prevLink,
      limit,
      sort,
      queryParam,
      user: req.session.user,
    });
  } catch (error) {
    console.log("Cannot get products view with mongoose: " + error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

 getCartController = async (req, res) => {
  try {
    let result = await cartService.getCartByIdPopulate(req.params.cid);
    if (result.length === 0)
      res.status(400).json({ status: "error", error: "ID NOT FOUND" });
    const products = result.products;
    res.render("cart", {
      idCart: result._id,
      products: products,
    });
  } catch (error) {
    console.log("Cannot get carts with mongoose: " + error);
    res.status(400).json({ message: error });
  }
};

  registerController = async (req, res) => {
  await managerAccess.saveLog("Register");
  res.render("register");
};

  loginController = async (req, res) => {
  await managerAccess.saveLog("Login");
  res.render("login");
};

}


module.exports = viewsController 