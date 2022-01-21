import mongoose from 'mongoose'

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 150,
        description: "Prodcut Name"
    }
});

const ProductModel = mongoose.model('Products', ProductsSchema);

export default ProductModel;