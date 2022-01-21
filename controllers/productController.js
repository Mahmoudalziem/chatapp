import ProductModel from "../models/productModel"
import Joi from 'joi'

class productController {

    index = async(req, res) => {

        res.render('home', { name: "Mahmoud Abd Alziem" });

    }
}

const Product = new productController();

export default Product;