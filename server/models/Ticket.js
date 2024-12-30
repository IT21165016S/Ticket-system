const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: { 
    type: String,
  },
  description: { 
    type: String,
    required: true,
  },
  status: { 
    type: String,
    enum: ['open', 'in-progress', 'Rejected', 'Approved'],
    default: 'open',
  },
  leaveType: {
    type: String,
    enum: ['Personal', 'Educational', 'Medical'],
    required: true,
  },
  files: {
    type: String
  },
  fileType:{
    type: String
    
  },
  createdAt: { 
    type: Date, 
    default: new Date(),
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);
