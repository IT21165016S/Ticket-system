import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, ticketActions } from "../redux/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import useStorage from "../hooks/useStorage";

const { reset } = ticketActions;

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, ticket } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [leaveType, setLeaveType] = useState("Personal");
  const [uploadFile, setUploadFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const { startUpload } = useStorage(setProgress, setError, setImgUrl, setFileType);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    } else if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
  }, [ticket]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      startUpload(e.target.files[0]);
      const selectedImageFile = new FileReader();

      selectedImageFile.onload = function () {
        setPreview(selectedImageFile.result);
      };

      selectedImageFile.readAsDataURL(e.target.files[0]);
    }
  };



  const onSubmit = (e) => {
    e.preventDefault();

    const data= {
      description: description,
      leaveType: leaveType,
      files: imgUrl,
      fileType: fileType
    }
  

    console.log('formData',data);

    dispatch(createTicket(data));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BackButton url="/" />
      <section className="text-center mt-4">
        <h1 className="text-3xl">Create New Ticket</h1>
        <p className="mt-2">Please fill out the form below</p>
      </section>

      <section className="mt-8 w-full max-w-lg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              User Email
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={user.email}
              disabled
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="leaveType" className="block text-gray-700 text-sm font-bold mb-2">
                Leave Type
              </label>
              <select
                id="leaveType"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Educational">Educational</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {(leaveType === "Educational" || leaveType === "Medical") && (
              <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                  Upload File (Image, PDF, Report)
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/jpeg, image/png, image/gif, image/bmp, image/webp,.pdf, .txt,.doc, .docx"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleFileChange}
                />
              </div>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewTicket;
