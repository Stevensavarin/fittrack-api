const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        const db = mongodb.getDatabase().db();
        const classes = await db.collection('classes').find().toArray();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid class id' });
        }

        const classId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db();
        const classes = await db.collection('classes').find({ _id: classId }).toArray();

        if (!classes[0]) {
            return res.status(404).json({ error: 'Class not found' });
        }

        res.status(200).json(classes[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createClass = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        const className = {
            title: req.body.title,
            description: req.body.description,
            trainer: req.body.trainer,
            capacity: req.body.capacity,
            schedule: req.body.schedule,
            duration: req.body.duration,
            location: req.body.location
        };

        const db = mongodb.getDatabase().db();
        const response = await db.collection('classes').insertOne(className);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Class created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create class' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateClass = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid class id' });
        }

        const classId = new ObjectId(req.params.id);
        const className = {
            title: req.body.title,
            description: req.body.description,
            trainer: req.body.trainer,
            capacity: req.body.capacity,
            schedule: req.body.schedule,
            duration: req.body.duration,
            location: req.body.location
        };

        const db = mongodb.getDatabase().db();
        const response = await db.collection('classes').replaceOne({ _id: classId }, className);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Class not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteClass = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid class id' });
        }

        const classId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db();
        const response = await db.collection('classes').deleteOne({ _id: classId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Class not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createClass,
    updateClass,
    deleteClass
}