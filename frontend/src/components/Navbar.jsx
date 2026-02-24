import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    navigate("/");
  };
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>

          <div className="flex items-center gap-4">

            {/* New Note */}
            <Link to="/create" className="btn btn-primary btn-sm">
              + New Note
            </Link>

            {/* Profile + Logout */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm flex items-center gap-2"
              >
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-8">
                    <span>
                      {username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                {username}
              </div>

              <ul className="dropdown-content menu bg-base-200 rounded-box z-[1] w-40 p-2 shadow">
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;






