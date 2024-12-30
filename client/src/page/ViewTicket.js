import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../redux/ticket/ticketSlice";
import { getNotes, createNote, reset as notesReset } from "../redux/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItems";


const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function ViewTicket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);
  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isError) {
      toast.error(message, { className: 'custom-toast-container' });
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId, user));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  // Check if ticket is null or undefined
  if (!ticket) {
    return <Spinner />;
  }

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed", { className: 'custom-toast-container' });
    navigate("/tickets");
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner/>;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <>
      <div className="ticket-page p-6 bg-gray-100 min-h-screen">
        <header className="ticket-header mb-6">
          <BackButton url="/tickets" />
          <h2 className="text-2xl font-bold mt-4 mb-2">
            Ticket ID: {ticket._id}
            <br></br>
            <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
          </h2>
          <h3 className="text-lg text-gray-600 mb-2">
            Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
          </h3>
          <hr className="mb-4" />
          <div className="ticket-desc mb-6">
            <h3 className="text-xl font-semibold mb-2">Description of Issues</h3>
            <p className="text-gray-700">{ticket.description}</p>
            <br></br>
            <br></br>
            {ticket.fileType === "pdf" && (<a href={ticket.files}>View PDF</a>)}
            <h3 className="text-xl font-semibold mb-2">File of the reason</h3>
            {ticket.fileType !== "pdf" && (<img src={ticket.files}></img>)}
          </div>
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
        </header>

        {ticket.status !== "closed" && (
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            <FaPlus className="inline-block mr-2" /> Add Note
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <h2 className="text-xl font-bold mb-4">Add Note</h2>
          <button className="btn-close absolute top-2 right-2 text-gray-500" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group mb-4">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder="Note text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <div className="notes mb-6">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>

        {ticket.status !== "closed" && (
          <button
            onClick={onTicketClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close Ticket
          </button>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default ViewTicket;
