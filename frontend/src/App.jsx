import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import RegisterPage from "./pages/RegisterPage";



const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "forest"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />


        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage setTheme={setTheme} theme={theme} />
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <PrivateRoute>
              <NoteDetailPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;





