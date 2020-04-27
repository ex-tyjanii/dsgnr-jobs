const express = require("express");
const mongoose = require("mongoose")

const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController")
const dotenv = require("dotenv");
const router = require("./routers/jobsRouter");


const app = express();

// Env configuration
dotenv.config({ path: "./config.env" });

// Body Parser
app.use(express.json());

// Calling Router
app.use("/api/v1/jobs", router);

// Unhandled routes error handler
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404))
})
app.use(errorController)

// Mongo config
const DB = process.env.MONGO_URI.replace("<PASSWORD>", process.env.MONGO_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(conn => {
    console.log("DB connection successful")
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port 5000 `)
})



