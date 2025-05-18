import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoginBg from "../../assets/images/loginbg.jpg";
import LoaderAnimation from "../login-card/LoaderAnimation";

const PendingApproval = () => {
  const [firstName, setFirstName] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFirstName("Guest");
      return;
    }

    fetch("http://localhost:5001/users?firstOnly=true", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          setFirstName("Guest");
          return;
        }
        const data = await res.json();
        console.log("Fetched data:", data);
        setFirstName(data.first_name || data.name || "Guest");
      })
      .catch(() => setFirstName("Guest"));
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
      setIsLoggingOut(false);
    }, 1000); // Optional 1-second delay for logout animation
  };

  return (
    <div
      className="flex-1 h-screen w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {isLoggingOut && <LoaderAnimation isLogin={false} />}
      <div className="text-white max-w-xl pl-10">
        <h1 className="text-6xl font-manjari font-light">Welcome,</h1>
        <h2 className="text-8xl font-figtree font-bold mt-2">{firstName}</h2>
        <p className="text-xl font-manjari mt-10">
          Your request is still pending for review by our team.
        </p>
        <p className="text-xl font-manjari mt-3 mb-10">
          Please return at a later time while we process your request.
        </p>
        <button
          className="w-full bg-[#10194C] hover:bg-[#1c2673] font-manjari transition duration-200 text-white py-3 px-8 rounded-full font-semibold text-lg"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
