const {Schema, model} =require ('mongoose')

const cartCollection = 'carts'

const cartSchema = new Schema({
    products: {

        //  Ver este tema nuevaemnte 
       /* type: [
            {
                product: {
                   type: mongoose.Schema.Types.ObjectId,
                    ref:"products"
                },
                
                quantity: Number
            }
        ],*/
        default: []
    },
});

cartSchema.pre('find', function(){
    this.populate("products.product");
})


//module.exports = model (cartCollection , Schema)  
module.exports = model ('carts', cartSchema)
