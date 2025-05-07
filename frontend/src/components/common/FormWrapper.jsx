import LoginBg from "../../assets/images/loginbg.jpg";

export default function FormWrapper({ title, children, onSubmit, className }) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center p-6 sm:p-10 ${className}`}
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="relative z-10 w-full max-w-[1000px] min-h-[500px] bg-blue-50/40 backdrop-blur-lg rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div
          className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 ${
            className === "register-card" ? "max-h-[80vh]" : ""
          }`}
        >
          {/* Left side */}
          <div className="space-y-6 text-white border-b-2 md:border-b-0 md:border-r-2 border-blue-50/50 pb-6 md:pb-0 pr-0 md:pr-6 sm:pr-8 overflow-hidden">
            <h2 className="text-3xl mt-4 sm:text-4xl text-primary font-figtree font-bold">
              {title}
            </h2>
            <ul className="text-primary text-sm font-manjari hidden md:block md:text-sm list-disc list-inside mt-6 space-y-2">
              <li>Streamlined management</li>
              <li>Other point</li>
              <li>More text</li>
            </ul>
          </div>

          {/* Right side form */}
          <form
            onSubmit={onSubmit}
            className={`space-y-8 text-white ${
              className === "register-card"
                ? "overflow-y-auto pr-6 sm:pr-8 max-h-[80vh]"
                : ""
            }`}
          >
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
