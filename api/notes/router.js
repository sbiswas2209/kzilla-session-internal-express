const { Router } = require('express')
const Joi = require('joi')
const { addNote, getNotes } = require('./service')
const router = Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Notes Route"
    })
})

router.post("/add", (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            content: Joi.string()
        })
        const { value, error } = schema.validate(req.body);
        if (error) {
            console.warn(error)
            throw {
                status: 422,
                message: "Validation Error"
            }
        } else {
            addNote(value.name, value.content).then((val) => {
                if (val) {
                    res.status(201).json({
                        message: "Added"
                    })
                } else {
                    throw {
                        status: 500,
                        message: "DB Fail"
                    }
                }
            })
        }
    } catch (e) {
        console.warn(e);
        res.status(e.status || 500).json({
            message: e.message || "An unexpected error occurred"
        })
    }
})

router.get("/get", (req, res) => {
    try {
        getNotes(req.query.id).then((val) => {
            if (val != -1) {
                res.status(201).json({
                    message: "List of notes",
                    data: val
                })
            } else {
                throw {
                    status: 500,
                    message: "DB Fail"
                }
            }
        })
    } catch (e) {
        console.warn(e);
        res.status(e.status || 500).json({
            message: e.message || "An unexpected error occurred"
        })
    }
})

module.exports = router