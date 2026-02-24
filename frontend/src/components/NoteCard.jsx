import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const NoteCard = ({ note, refreshNotes }) => {

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://mern-thinkboard-fm8w.onrender.com/api/notes/${note._id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      toast.success("Note deleted successfully");
      refreshNotes();
    } catch (error) {
  console.error(error);
  toast.error("Delete failed");
}
  };

  return (
    <div className="bg-base-200 rounded-xl p-5 shadow-md border-t-4 border-primary hover:shadow-lg transition">

      <h2 className="text-lg font-semibold mb-2">
        {note.title}
      </h2>

      <p className="text-sm text-base-content/70 mb-4">
        {note.content}
      </p>

      <div className="flex justify-end gap-3">

        {/* EDIT */}
        <Link
          to={`/note/${note._id}`}
          className="text-base-content/70 hover:text-primary"
        >
          <Pencil size={18} />
        </Link>

        {/* DELETE */}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
};

export default NoteCard;