const { default: mongoose } = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongoDB 😎");
    }
    catch (err) {
        console.log("Failed to connect mongoDB 😒 !", err);
    }
}