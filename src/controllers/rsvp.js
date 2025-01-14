require("dotenv").config();
const env = require("../config/env.config")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Models
const Rsvp = require("../models/Rsvp");

const addRSVP = async (req, res) => {
    const { name, phone_number, quantity } = req.body;

    if (!name || !phone_number || !quantity) { return res.status(400).json({ message: "All fields are required" }); }

    const rsvp = await Rsvp.create({
        id_rsvp: uuidv4(),
        name,
        phone_number,
        quantity,
        status: "Pending",
    });

    console.log("\nRSVP added successfully\n", rsvp, "\n");
    return res.status(201).json({ message: "RSVP added successfully", data: rsvp });
}

const fetchRSVP = async (req, res) => {
    const rsvp = await Rsvp.find({ deleted_at: null });

    console.log("\nRSVP fetched successfully\n", rsvp, "\n");
    return res.status(200).json({ message: "RSVP fetched successfully", data: rsvp });
}

const getRSVP = async (req, res) => {
    const { id } = req.params

    const rsvp = await Rsvp.findOne({ id_rsvp: id, deleted_at: null });
    if (!rsvp) { return res.status(404).json({ message: "RSVP not found" }); }

    console.log("\nRSVP fetched successfully\n", rsvp, "\n");
    return res.status(200).json({ message: "RSVP fetched successfully", data: {
        _id: rsvp._id,
        id_rsvp: rsvp.id_rsvp,
        name: rsvp.name,
        phone_number: rsvp.phone_number,
        quantity: rsvp.quantity,
        status: rsvp.status,
    } });
}

const detailRSVP = async (req, res) => {
    const { id } = req.params

    const rsvp = await Rsvp.findOne({ id_rsvp: id, deleted_at: null });
    if (!rsvp) { return res.status(404).json({ message: "RSVP not found" }); }

    console.log("\nRSVP fetched successfully\n", rsvp, "\n");
    return res.status(200).json({ message: "RSVP fetched successfully", data: rsvp });
}

const updateRSVP = async (req, res) => {
    const { id } = req.params;
    const { name, phone_number, quantity, status } = req.body;

    if (!id) { return res.status(400).json({ message: "RSVP ID is required" }); }

    const rsvp = await Rsvp.findOne({ id_rsvp: id, deleted_at: null });
    if (!rsvp) { return res.status(404).json({ message: "RSVP not found" }); }

    if (name) { rsvp.name = name; }
    if (phone_number) { rsvp.phone_number = phone_number; }
    if (quantity) { rsvp.quantity = quantity; }
    if (status) { rsvp.status = status; }

    await rsvp.save();

    console.log("\nRSVP updated successfully\n", rsvp, "\n");
    return res.status(200).json({ message: "RSVP updated successfully", data: rsvp });
}

const deleteRSVP = async (req, res) => {
    const { id } = req.params;

    if (!id) { return res.status(400).json({ message: "RSVP ID is required" }); }

    const rsvp = await Rsvp.findOne({ id_rsvp: id, deleted_at: null });
    if (!rsvp) { return res.status(404).json({ message: "RSVP not found" }); }

    rsvp.deleted_at = new Date();
    await rsvp.save();

    console.log("\nRSVP deleted successfully\n", rsvp, "\n");
    return res.status(200).json({ message: "RSVP deleted successfully", data: rsvp });
}

module.exports = {
    addRSVP,
    fetchRSVP,
    getRSVP,
    detailRSVP,
    updateRSVP,
    deleteRSVP,
}