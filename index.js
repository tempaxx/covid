const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db")

// Database
connectDB();

// Middleware
app.use(express.json())


// Routes
const userRoutes = require("./routes/user")
app.use("/api", userRoutes)

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})