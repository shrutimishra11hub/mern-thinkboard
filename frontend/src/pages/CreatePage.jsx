import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      const res = await fetch(
        "https://mern-thinkboard-fm8w.onrender.com/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            userId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create note");
      }

      toast.success("Note created successfully");
      navigate("/home");

    } catch (error) {
      toast.error("Failed to create note");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">

      <Link to="/home" className="text-sm hover:text-primary">
        ← Back to Notes
      </Link>

      <div className="max-w-3xl mx-auto mt-8 bg-base-200 p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">
          Create New Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Note Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note here..."
            className="textarea textarea-bordered w-full h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Create Note
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePage;
