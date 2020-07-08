const mongoose = require("mongoose")
const mongoID = require("config").get("mongoID")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoID, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
        console.log("Database Connected")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB