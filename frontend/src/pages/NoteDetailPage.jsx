import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/notes/note/${id}`
        );

        const data = await res.json();

        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (error) {
        toast.error("Failed to load note");
      }
    };

    fetchNote();
  }, [id]);

 const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      `http://localhost:5001/api/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );

    if (!res.ok) throw new Error();

    toast.success("Updated");
    navigate("/home");
  } catch {
    toast.error("Update failed");
  }
};


  return (
    <div className="min-h-screen bg-base-100 p-6">
      <Link to="/home" className="text-sm hover:text-primary">
        ← Back to Notes
      </Link>

      <div className="max-w-3xl mx-auto mt-8 bg-base-200 p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Edit Note</h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="textarea textarea-bordered w-full h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;

