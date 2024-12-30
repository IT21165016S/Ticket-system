const Ticket = require('../models/Ticket');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTicket = async (req, res) => {
  const { description, leaveType, files,fileType } = req.body;
  

  const newTicket = new Ticket({
    description,
    leaveType,
    files,
    fileType,
    status: 'in-progress', // Default status set to 'open'
    createdAt: new Date()
  });

  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticket_id = req.params.id;
    const { description, status, leaveType } = req.body;
    const files = req.files ? req.files.map(file => ({
      fileName: file.originalname,
      filePath: `/${file.path}`,
    })) : [];

    const updateFields = { description, status, leaveType };
    if (files.length > 0) {
      updateFields.files = files;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      ticket_id,
      updateFields,
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({ error: "No ticket by that id found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket_id = req.params.id;
    const ticket = await Ticket.findByIdAndDelete(ticket_id);

    if (!ticket) {
      res.status(404).json({ error: "No ticket by that id found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(201).json(tickets);
};

const viewTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error("No Ticket found");
  }
  if (ticket.user && ticket.user.toString() != req.user.id) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  res.status(201).json(ticket);
};

module.exports = { 
  getTickets, 
  createTicket, 
  updateTicket, 
  deleteTicket,
  viewTicket, 
  viewTickets,
  upload 
};
