import "../../App.css";

export default function FormWrapper({ title, children, onSubmit, className }) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center p-4 sm:p-6 relative ${className}`}
      style={{ backgroundImage: "url('/src/assets/images/loginbg.jpg')" }}
    >
      {/* Manual opacity overlay for contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="relative z-10 w-fit max-w-5xl rounded-2xl p-6 sm:p-10 shadow-2xl ring-1 ring-white/10"
        style={{
          background: "rgba(255,255,255,0.5)",
        }}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-6 ${
            className === "register-card" ? "h-fit" : "h-[40vh]"
          }`}
        >
          {/* Left side (fixed) */}
          <div className="space-y-4 text-white border-b-2 md:border-b-0 md:border-r-2 border-white border-opacity-50 pb-4 md:pb-0 pr-0 md:pr-4 sm:pr-6">
            <h2 className="text-2xl sm:text-3xl text-primary font-figtree font-bold leading-snug">
              {title}
            </h2>
            <ul className="text-primary text-sm font-regular font-manjari hidden md:block md:text-sm list-disc list-inside mt-4 space-y-1">
              <li>Streamlined management</li>
              <li>Other point</li>
              <li>More flavor text</li>
            </ul>
          </div>

          {/* Right side (scrollable form) */}
          <form
            onSubmit={onSubmit}
            className={`space-y-6 text-white ${
              className === "register-card" ? " pr-10" : ""
            }`}
          >
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
