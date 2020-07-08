const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("config")


// Signup
router.post("/signup", async(req,res) => {
    const {phoneNumber, password} = req.body;
    try {
        let user = await User.findOne({phoneNumber})
        if(user){
            return res.status(400).json({ error: "Already registered" })
        }
        user = new User({ phoneNumber, password })

        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save();

        // Generating token
        const payload = {
            user: {
                id: user.id
            }
        }

        const token = await jwt.sign(payload, config.get("secret"))
        res.json({token})
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// Login
router.post("/login", async(req,res) => {
    const {phoneNumber, password} = req.body;
    try {
        const user = await User.findOne({ phoneNumber })
        if(!user){
            return res.status(404).json({ error: "No user found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ error: "Invalid Password" })
        }

        // Generating token
        const payload = {
            user: {
                id: user.id
            }
        }

        const token = await jwt.sign(payload, config.get("secret"))
        res.json({token})
    } catch (error) {
        return res.status(500).send(error.message)
    }
})


module.exports = router;