import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <div className="ticket p-4 border rounded-md shadow-md">
      <div className="text-gray-600 mb-2">
        {new Date(ticket.createdAt).toLocaleString("en-US")}
      </div>
      <Link
        to={`/ticket/${ticket._id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block mt-4"
      >
        View
      </Link>
    </div>
  );
}

export default TicketItem;
