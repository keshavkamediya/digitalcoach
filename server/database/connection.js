const mongoose = require("mongoose")
const mongodb_username = "keshavkamediya250"
const mongodb_password = "keshav%40122911"

mongoose.connect(`mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.j4ca5qs.mongodb.net/ForexEagle?retryWrites=true&w=majority`)

mongoose.connection.on("error", (err) => {
    console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});