import axios from "axios";

const API_URL = "/api/tickets/view-tickets/";

// Get ticket notes
const getNotes = async (ticketId,user ,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  };

  console.log('user data',user)

  const response = await axios.get(API_URL + ticketId + "/notes",{
    user: user
  }, config);

  return response.data;
};

// Create ticket note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + ticketId + "/notes",
    {
      text: noteText,
    },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;