import React from "react";

export default function FormWrapper({ title, children, onSubmit }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-login-bg bg-cover bg-no-repeat bg-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 rounded-l w-full min-h-screen"></div>
      <div className="w-full max-w-5xl bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 sm:p-10 shadow-2xl ring-1 ring-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-6">
          {/* Titles and All (Left) */}
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

          {/* Form Content (Right) */}
          <form onSubmit={onSubmit} className="space-y-6 text-white">
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
