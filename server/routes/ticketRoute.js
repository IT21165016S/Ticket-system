const express = require('express');
const protect = require("../middleware/authMiddleware");
const { 
    createTicket, 
    getTickets, 
    viewTicket,
    updateTicket, 
    deleteTicket, 
    upload} = require('../contollers/ticketController');
const router = express.Router();

const { getNotes, addNote } = require('../contollers/noteController');

router.post('/',upload.array('files'), createTicket);
router.get('/', getTickets);
router.get('/view-tickets/:id',viewTicket);
router.get('/view-tickets/:id/notes',getNotes);
router.post('/view-tickets/:id/notes', addNote);
router.put('/:id',upload.array('files') ,updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
