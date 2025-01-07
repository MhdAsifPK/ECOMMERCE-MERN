import products from "../backend/data/products.js";
import users from "../backend/data/users.js";
import connectDb from "./config/db.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import dotenv from "dotenv"

// for access .env connection
dotenv.config()
connectDb();

const importData = async ()=>{
    try {
        // for removing any data in db , 
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const sampleProducts = products.map((product)=>{
            return {...product,user:createdUsers[0]._id} //id inect cheythhu
        })
        const createProducts = await Product.insertMany(sampleProducts)
        console.log("data imported")
        // for one tyme exucution
        process.exit()
    } catch (error) {
        console.error(error.message)
        process.exit(1)

        
    }
}
importData();