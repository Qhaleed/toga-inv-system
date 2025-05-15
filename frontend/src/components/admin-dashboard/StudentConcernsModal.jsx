import React from "react";

export default function StudentConcernsModal({ concerns, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative animate-fade-in max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h4 className="text-lg font-bold mb-4">All Student Concerns</h4>
        <ul className="flex flex-col gap-4">
          {concerns.map((concern, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-1 border-b pb-2 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="font-semibold text-gray-800">
                  {concern.subject}
                </span>
                <span
                  className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${concern.statusColor}`}
                >
                  {concern.status}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-400 ml-4 gap-2">
                <span>{concern.date}</span>
                <span>{concern.time}</span>
              </div>
              <div className="text-xs text-gray-500 ml-4">
                Student: {concern.student}
              </div>
              <div className="text-xs text-gray-600 ml-4">
                "{concern.message}"
              </div>
              <div className="text-xs text-gray-400 ml-4">
                Response: {concern.response}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
