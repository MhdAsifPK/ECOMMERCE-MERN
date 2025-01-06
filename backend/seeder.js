import products from "../backend/data/products.js";
import users from "../backend/data/users.js";
import connectDb from "./config/db.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import dotenv from "dotenv"

dotenv.config()
connectDb();

const importData = async ()=>{
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const sampleProducts = products.map((product)=>{
            return {...product,user:createdUsers[0]._id}
        })
        const createProducts = await Product.insertMany(sampleProducts)
        console.log("data imported")
        process.exit()
    } catch (error) {
        console.error(error.message)
        process.exit()

        
    }
}
importData();