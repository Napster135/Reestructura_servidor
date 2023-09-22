const  mongoose = require ("mongoose")
const mongoosePaginate = require ("mongoose-paginate-v2")

const productCollection = "products";

 productSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: String,
  price: {
    type: Number,
    require: true,
  },
  thumnail: String,
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
  category: {
    type: String,
    require: true,
  },
  status: Boolean,
});

productSchema.plugin(mongoosePaginate);


module.exports = mongoose.model(productCollection, productSchema)