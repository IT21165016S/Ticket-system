import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";


function Home() {

  const user = useSelector((state) => state.auth.user);
  console.log('user',user)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      

      <div className="mt-8 w-full max-w-xs">
        {user && user.role === "admin" && (
          <>
          {/* <section className="text-center">
            <h1 className="text-3xl"></h1>
            <p className="mt-2"></p>
          </section> */}
          <Link
            to="/tickets"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block"
          >
            <FaTicketAlt className="inline-block mr-2" /> View Tickets
            
          </Link>
        </>
        )}

        {user && user.role === "user" && (
          <>
          <section className="text-center">
            <h1 className="text-3xl">What do you need help with?</h1>
            <p className="mt-2">Please choose from an option below</p>
          </section>
            <Link
              to="/new-ticket"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mb-4"
            >
              <FaQuestionCircle className="inline-block mr-2" /> Create New Ticket
            </Link>

            <Link
              to="/tickets"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block"
            >
              <FaTicketAlt className="inline-block mr-2" /> View My Tickets
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
