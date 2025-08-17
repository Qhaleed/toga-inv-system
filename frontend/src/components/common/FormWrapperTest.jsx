import LoginBg from "../../assets/images/loginbg.jpg";

export default function FormWrapper({ title, children, onSubmit }) {
  return (
    <div className="h-screen flex items-center justify-center">
      {/* Main card */}
      <div className="w-full h-full flex rounded-2xl overflow-hidden shadow-2xl">
        {/* Left side (50%) */}
        <div className="w-1/2 relative p-4">
          <div className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={LoginBg}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side (50%) */}
        <div className="w-1/2 flex flex-col justify-center p-24">
          <h2 className="text-4xl font-bold text-primary mb-6">{title}</h2>
          <form onSubmit={onSubmit} className="mt-8 space-y-8">
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
