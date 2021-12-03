const { Router } = require('express');
const notesRouter = require('./notes/router')

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "API Routes"
    })
})

router.use("/notes", notesRouter)

module.exports = router;