const PendingApproval = ({ name, onLogout }) => (
  <div className="flex-1 flex flex-col justify-center items-center text-white p-8 bg-login-bg h-screen w-full">
    <h1 className="text-4xl font-bold">Welcome,</h1>
    <h2 className="text-5xl font-extrabold my-2">{name}</h2>
    <p className="text-lg mt-4">
      Your request is still pending for review by our team.
    </p>
    <p className="text-md text-gray-300 mb-6">
      Please return at a later time while we process your request.
    </p>
    <button
      className="bg-[#10194C] hover:bg-[#1c2673] text-white py-2 px-6 rounded-full font-semibold"
      onClick={onLogout}
    >
      Log Out
    </button>
  </div>
);

export default PendingApproval;
