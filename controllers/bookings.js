const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Bookings']
    try {
        const db = mongodb.getDatabase().db();
        const bookings = await db.collection('bookings').find().toArray();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Bookings']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid booking id' });
        }

        const bookingId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db();
        const bookings = await db.collection('bookings').find({ _id: bookingId }).toArray();

        if (!bookings[0]) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(bookings[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createBooking = async (req, res) => {
    //#swagger.tags=['Bookings']
    try {
        const createdAt = new Date().toISOString().replace('Z', '+00:00');

        const booking = {
            user: req.body.user,
            class: req.body.class,
            status: req.body.status,
            createdAt: createdAt,
        };

        const db = mongodb.getDatabase().db();
        const response = await db.collection('bookings').insertOne(booking);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Booking created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create booking' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateBooking = async (req, res) => {
    //#swagger.tags=['Bookings']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid booking id' });
        }

        const bookingId = new ObjectId(req.params.id);
        const booking = {
            user: req.body.user,
            class: req.body.class,
            status: req.body.status,
            createdAt: req.body.createdAt,
        };

        const db = mongodb.getDatabase().db();
        const response = await db.collection('bookings').replaceOne({ _id: bookingId }, booking);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Booking not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteBooking = async (req, res) => {
    //#swagger.tags=['Bookings']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid booking id' });
        }

        const bookingId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db();
        const response = await db.collection('bookings').deleteOne({ _id: bookingId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createBooking,
    updateBooking,
    deleteBooking
}