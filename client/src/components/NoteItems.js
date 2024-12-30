import { useSelector } from "react-redux";

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`note p-4 rounded-md shadow-md ${
        note.isStaff ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h4 className="text-lg font-semibold">
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p className="mt-2">{note.text}</p>
      <div className="note-date text-sm text-gray-500 mt-4">
        {new Date(note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default NoteItem;
