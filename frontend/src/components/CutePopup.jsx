import { useEffect, useState } from "react";

const CutePopup = ({ username }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000); // disappears after 4 sec

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-base-200 shadow-xl rounded-xl p-4 flex items-center gap-3 animate-bounce z-50">
      
      {/* Cute Face */}
      <div className="text-3xl">
        🧸
      </div>

      <div>
        <p className="font-semibold">
          Welcome back, {username}! ✨
        </p>
        <p className="text-sm text-base-content/70">
          Your personal space for powerful thinking💛
        </p>
      </div>
    </div>
  );
};

export default CutePopup;
