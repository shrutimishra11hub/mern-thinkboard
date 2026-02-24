import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";
import CutePopup from "../components/CutePopup";


const HomePage = ({ theme, setTheme }) => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/"); 
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
  try {
    const userId = localStorage.getItem("userId");

    const res = await fetch(
    "https://mern-thinkboard-fm8w.onrender.com/api/notes/user/${userId}"
    );

    const data = await res.json();
    setNotes(data);

  } catch (error) {
    console.error("Failed to fetch notes");
  }
};



  return (
    <div className="min-h-screen bg-base-100">

      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />
      <CutePopup username={localStorage.getItem("username")} />


      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {notes.length === 0 ? (
          <div className="text-center text-base-content/60">
            <p className="text-lg">No notes available.</p>
            <p className="text-sm mt-2">
              Click "+ New Note" to create your first note.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
  <NoteCard
    key={note._id}
    note={note}
    refreshNotes={fetchNotes}
  />
))}

          </div>
        )}

      </main>
    </div>
  );
};

export default HomePage;
