const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Memberships']
    try {
        const db = mongodb.getDatabase().db();
        const memberships = await db.collection('memberships').find().toArray();
        res.status(200).json(memberships);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Memberships']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid membership id' });
        }

        const membershipId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db();
        const memberships = await db.collection('memberships').find({ _id: membershipId }).toArray();

        if (!memberships[0]) {
            return res.status(404).json({ error: 'Membership not found' });
        }

        res.status(200).json(memberships[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createMembership = async (req, res) => {
    //#swagger.tags=['Memberships']
    try {
        const membership = {
            name: req.body.name,
            price: req.body.price,
            duration: req.body.duration,
            benefits: req.body.benefits,
            isActive: req.body.isActive
        };

        const db = mongodb.getDatabase().db();
        const response = await db.collection('memberships').insertOne(membership);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Membership created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create membership' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateMembership = async (req, res) => {
    //#swagger.tags=['Memberships']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid membership id' });
        }

        const membershipId = new ObjectId(req.params.id);
        const membership = {
            name: req.body.name,
            price: req.body.price,
            duration: req.body.duration,
            benefits: req.body.benefits,
            isActive: req.body.isActive
        };

        const db = mongodb.getDatabase().db();
        const response = await db.collection('memberships').replaceOne({ _id: membershipId }, membership);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Membership not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMembership = async (req, res) => {
    //#swagger.tags=['Memberships']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid membership id' });
        }

        const membershipId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db();
        const response = await db.collection('memberships').deleteOne({ _id: membershipId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Membership not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMembership,
    updateMembership,
    deleteMembership
}