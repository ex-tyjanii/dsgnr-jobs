const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Jobs = require("../models/Jobs")


dotenv.config({ path: "./config.env" });

const DB = process.env.MONGO_URI.replace("<PASSWORD>", process.env.MONGO_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(conn => {
    console.log("DB connection successful")
})

const newJobs = JSON.parse(fs.readFileSync(`${__dirname}/../data/jobsData.json`, "utf-8"));



const importData = async () => {
    try {
        await Jobs.create(newJobs);
        console.log("Jobs created");
        process.exit();
    } catch (err) {
        console.log(err)
    }

}


const deleteData = async () => {
    try {
        await Jobs.deleteMany();
        console.log("Jobs deleted")
        process.exit();
    } catch (err) {
        console.log(err)
    }

}


if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

