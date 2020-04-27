const Jobs = require("../models/Jobs");
const APIFeatures = require("../utils/ApiFeatures");
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")




exports.getAllJobs = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Jobs.find(), req.query).filter().sorting().selecting().pagination();
    // invoke function
    const jobs = await features.query;

    res.status(200).json({
        success: true,
        count: jobs.length,
        page: features.page,
        data: {
            jobs
        }
    })
})

exports.getJob = catchAsync(async (req, res, next) => {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
        return next(new AppError("No tour found with that id", 404))
    }
    res.status(200).json({
        success: true,
        data: {
            job
        }
    })
})

exports.createJobs = catchAsync(async (req, res, next) => {
    const job = await Jobs.create(req.body);

    res.status(201).json({
        success: true,
        data: {
            job
        }
    })
})

exports.updateJobs = catchAsync(async (req, res, next) => {
    const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!job) {
        return next(new AppError("No tour found with that id", 404))
    }
    res.status(200).json({
        success: true,
        data: {
            job
        }
    })
})

exports.deleteJobs = catchAsync(async (req, res, next) => {
    const job = await Jobs.findOneAndDelete(req.params.id)
    if (!job) {
        return next(new AppError("No tour found with that id", 404))
    }
    res.status(200).json({
        success: true,
        data: {
            job
        }
    })
})