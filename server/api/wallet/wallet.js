const { Router } = require('express')
const router = Router();
require('dotenv').config();
const User = require("./../../models/user")
const authenticator = require("./../../middleware/authenticator")

router.use(authenticator())
router.post('/', (req, res) => {
    const { userId } = req.body
    if (userId) {
        User.findOne({ userId }).then((user) => {
            res.status(200).json({ status: "success", wallet: { ...user.wallet } })
        }).catch((error) => {
            console.log(error)
        })
    } else {
        res.status(200).json({ status: "error", message: "Please provide valid user Id" })
    }

})

module.exports = router