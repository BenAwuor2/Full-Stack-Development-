const { Router } = require ('express');

const LogEntry = require('../models/LogEntry');

const router = Router();
// Get Route for all
router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    }catch (error) {
        next(error);
    }
});
// Post Route to the Docs
router.post('/', async (req, res, next) => {
    try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
    }
    catch (error) {
        // console.log(error.constructor.name);
        if (error.constructor.name === "ValidationError") {
            res.status(422);
        }
        next(error);
    }
    // console.log(req.body);
});
// Put route Definition using_route params: ":id"

router.put("/:id", async (req, res, next) => {
    const logId = req.params.id;
    const newData = req.body;

    try {
        const updatedEntry = await LogEntry.findByIdAndUpdate(logId, newData, { new:true });

        if (!updatedEntry) {
            res.status(404).json({message: 'User Not Found😒'});
        };
        res.json(updatedEntry);
    } catch(error) {
        console.error(error);
        next(error);
    };

});

// Delete route definition
router.delete("/:id", async (req, res, next) => {
    const logId = req.params.id;

    try {
        const deletedEntry = await LogEntry.findByIdAndDelete(logId);

        if (!deletedEntry) {
            res.status(404).json({ message: 'Log Entry Not Found 😒' });
        }

        res.json({message: 'Log Entry deleted successfuly!'});

    }catch(error) {
        console.error(error);
        next(error);
    }
   
});
module.exports = router;