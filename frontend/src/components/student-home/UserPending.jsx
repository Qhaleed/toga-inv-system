import LoginBg from "../../assets/images/loginbg.jpg";

const PendingApproval = ({ name, onLogout }) => (
  <div
    className="flex-1 h-screen w-full bg-cover bg-center flex items-center"
    style={{ backgroundImage: `url(${LoginBg})` }}
  >
    <div className="text-white max-w-xl pl-10">
      <h1 className="text-6xl font-light">Welcome,</h1>
      <h2 className="text-8xl font-bold mt-2">{name}</h2>
      <p className="text-xl mt-10">
        Your request is still pending for review by our team.
      </p>
      <p className="text-xl mt-3 mb-10">
        Please return at a later time while we process your request.
      </p>
      <button
        className="w-full bg-[#10194C] hover:bg-[#1c2673] transition duration-200 text-white py-3 px-8 rounded-full font-semibold text-lg"
        onClick={onLogout}
      >
        Log Out
      </button>
    </div>
  </div>
);

export default PendingApproval;
