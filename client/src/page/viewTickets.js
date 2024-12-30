import { viewTickets, ticketActions } from "../redux/ticket/ticketSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItems";

function ViewTickets() {
  const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets);
  const user = useSelector((state) => state.auth.user);

  const { reset } = ticketActions;
  const dispatch = useDispatch();

  const handleDelete = async (ticketId) => {
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_TICKET", payload: json });
      dispatch(viewTickets()); // Refresh the list of tickets after delete
    }
  };

  const handleStatusChange = async (ticketId, currentStatus) => {
    const newStatus =
      currentStatus === "in-progress"
        ? "Rejected"
        : currentStatus === "Rejected"
        ? "Approved"
        : "in-progress";

    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "UPDATE_TICKET", payload: json });
      dispatch(viewTickets()); // Refresh the list of tickets after status change
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    } else {
      dispatch(viewTickets());
    }
  }, [tickets]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Tickets</h1><br></br>
        <div className="bg-white shadow-md rounded overflow-hidden">
          <div className="grid grid-cols-6 gap-4 font-semibold mb-4 border-b-2 pb-2">
            {user.role === "admin" && <div className="col-span-1">User ID</div>}
            <div className="col-span-1 ">Leave Type</div>
            <div className="col-span-1">Description</div>
            <div className="col-span-1">Files</div>
            <div className="col">Status</div>
            <div className="col">Actions</div>
          </div>
          {tickets.map((ticket) => (
            <div key={ticket._id} className="grid grid-cols-6 gap-4 p-2 border-b-2">
              {user.role === "admin" && <div className="col-span-1">{ticket._id}</div>}
              <div className="col-span-1">
                <p className="truncate">{ticket.leaveType}</p>
              </div>
              <div className="col-span-1">
                <p className="truncate">{ticket.description}</p>
              </div>
              <div className="col-span-1">
                {ticket.files ? (
                  <ul className="list-none pl-0">
                    
                
                      <li>
                        {ticket.fileType === "pdf" && (<a href={ticket.files}>View PDF</a>)}
                        {ticket.fileType !== "pdf" && (<img src={ticket.files}></img>)}
                      </li>

                  </ul>
                ) : (
                  <p>No files uploaded</p>
                )}
              </div>
              <div className="col">
              {user.role === "admin" ? (
                <div
                  className={`status px-2 py-1 rounded text-white cursor-pointer ${
                    ticket.status === "in-progress"
                      ? "bg-yellow-500"
                      : ticket.status === "Approved"
                      ? "bg-green-500"
                      : ticket.status === "Rejected"
                      ? "bg-red-500"
                      : ""
                  }`}
                  onClick={() => handleStatusChange(ticket._id, ticket.status)}
                >
                  {ticket.status}
                </div>
              ) : (
                ticket.user === user.id && (
                  <>
                  <div
                  className={`status px-2 py-1 rounded text-white cursor-pointer ${
                    ticket.status === "in-progress"
                      ? "bg-yellow-500"
                      : ticket.status === "Approved"
                      ? "bg-green-500"
                      : ticket.status === "Rejected"
                      ? "bg-red-500"
                      : ""
                  }`}
                  >
                   {ticket.status}
                   </div>
                  </>  
                )
              )}
              </div>
              <div>
                {user.role === "admin" ? (
                  <TicketItem key={ticket._id} ticket={ticket} />
                ) : (
                  ticket.user === user.id && (
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewTickets;
