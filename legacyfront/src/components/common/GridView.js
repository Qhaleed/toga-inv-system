import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Table } from "../../assets/icons/table.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye-icon.svg";
import { ReactComponent as Trash } from "../../assets/icons/black-trash.svg";
import { ReactComponent as ChevronDown } from "../../assets/icons/chevron-down.svg";
import HoverPopup from "./HoverPopup";

// CustomDropdown for table/grid inline editing
const CustomDropdown = ({ value, options, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-[30%] inline ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
      tabIndex={0}
      style={{
        outline: open ? "1.5px solid #0C7E48" : "1.5px solid #696969",
        borderRadius: 30,
        cursor: disabled ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        background: open ? "#fff" : "#F3F4F6",
        transition: "outline-color 0.3s, background 0.2s",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center px-1 md:px-3 text-black sm:text-[8px] text-[6px] md:text-[10px] lg:text-[11px] justify-center font-semibold font-Figtree tracking-widest focus:outline-[#EDB427] focus:outline-1.5 focus:outline-offset-[-1px] focus:outline-blur-md"
        style={{
          borderRadius: 35,
          minHeight: "20px",
          background: open ? "#0C7E48" : "#DBDBDB",
          color: open ? "#fff" : "#000000",
          transition: "background 0.3s",
          position: "relative",
        }}
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{value}</span>
        <span
          className="items-center absolute hidden md:flex lg:flex"
          style={{
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "cursor",
          }}
        >
          <ChevronDown
            className="w-2.5 h-2.5 text-black absolute"
            style={{ opacity: open ? 0.8 : 1, color: open ? "#fff" : "#000" }}
            aria-hidden="true"
          />
        </span>
      </button>
      {open && (
        <div className="absolute z-30 left-0 top-full w-full mt-1 animate-fade-in flex justify-center">
          <div
            className="w-full h-full absolute top-0 left-0 rounded-lg border-[1.5px] border-[#0C7E48] bg-[#E9E9E9] pointer-events-none"
            style={{ zIndex: 0 }}
          />
          <div
            className="relative w-full overflow-auto flex flex-col items-center"
            style={{ zIndex: 1 }}
            role="listbox"
          >
            {options.map((opt, idx) => (
              <div
                key={opt}
                className={`my-1.0 text-xs font-Figtree w-full h-8 flex items-center justify-center text-black cursor-pointer transition-colors duration-150$${
                  opt === value
                    ? " font-bold text-[#0C7E48] bg-slate-200 border-l-[1.5px] border-r-[1.5px] border-[#0C7E48]"
                    : ""
                }`}
                style={{
                  background: opt === value ? "#E9E9E9" : "transparent",
                  borderRadius: "0",
                  borderLeft: opt === value ? "5px solid #0C7E48" : "none",
                  borderRight: opt === value ? "5px solid #0C7E48" : "none",
                  borderTop: "none",
                  borderBottom: "none",
                }}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                role="option"
                aria-selected={opt === value}
                tabIndex={0}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d9d9d9";
                  e.currentTarget.style.color = "#0C7E48";
                  if (idx === 0) {
                    e.currentTarget.style.borderTopLeftRadius = "5px";
                    e.currentTarget.style.borderTopRightRadius = "5px";
                  } else if (idx === options.length - 1) {
                    e.currentTarget.style.borderBottomLeftRadius = "5px";
                    e.currentTarget.style.borderBottomRightRadius = "5px";
                  } else {
                    e.currentTarget.style.borderTopLeftRadius = "0";
                    e.currentTarget.style.borderTopRightRadius = "0";
                    e.currentTarget.style.borderBottomLeftRadius = "0";
                    e.currentTarget.style.borderBottomRightRadius = "0";
                  }
                  if (opt === value) {
                    e.currentTarget.style.borderLeft = "1.5px solid #0C7E48";
                    e.currentTarget.style.borderRight = "1.5px solid #0C7E48";
                    e.currentTarget.style.borderTop = "none";
                    e.currentTarget.style.borderBottom = "none";
                  } else {
                    e.currentTarget.style.border = "none";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    opt === value ? "#E9E9E9" : "transparent";
                  e.currentTarget.style.color =
                    opt === value ? "#0C7E48" : "#000";
                  e.currentTarget.style.borderTopLeftRadius = "4";
                  e.currentTarget.style.borderTopRightRadius = "4";
                  e.currentTarget.style.borderBottomLeftRadius = "4";
                  e.currentTarget.style.borderBottomRightRadius = "4";
                  if (opt === value) {
                    e.currentTarget.style.borderLeft = "4px solid #0C7E48";
                    e.currentTarget.style.borderRight = "4px solid #0C7E48";
                    e.currentTarget.style.borderTop = "none";
                    e.currentTarget.style.borderBottom = "none";
                  } else {
                    e.currentTarget.style.border = "none";
                  }
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GridView = ({
  dashboard,
  editId,
  editData,
  hoveredEyeId,
  popupMode,
  modifyTable,
  tasselOptions,
  hoodOptions,
  gownOptions,
  handleEditClick,
  handleEditChange,
  handleSave,
  handleCancel,
  setHoveredEyeId,
  setPopupMode,
  setPopupUser,
  setPopupOpen,
  hideActionButton,
}) => {
  return (
    <div className="w-full animate-fade-in" style={{ height: "80vh" }}>
      <div
        className="flex flex-row flex-wrap gap-2 w-full p-4 justify-center sm:justify-start items-start shadow-lg"
        style={{ boxShadow: "0 4px 24px 0 rgba(43, 43, 43, 0.12)" }}
      >
        {dashboard.map((db, idx) => (
          <div
            key={db.id}
            className="bg-white shadow-lg mt-10 md:mt-0 flex flex-col items-center border border-gray-200 transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl opacity-0 animate-fade-in relative"
            style={{
              animationDelay: `${idx * 80}ms`,
              maxWidth: "400px",
              minWidth: "350px",
              height: "400px",
              maxHeight: "500px",
              minHeight: "450px",
              padding: "2rem",
              flex: "1 1 300px",
              boxSizing: "border-box",
            }}
          >
            {editId === db.id ? (
              <div className="w-full items-center flex flex-col justify-center">
                <h4 className="font-bold text-2xl mb-4 flex text-center">
                  {db.studentname}
                </h4>
                <div className="text- text-gray-700 mb-2">
                  Program: {db.program}
                </div>
                <div className="flex items-center mb-2 w-full">
                  <span className="  right-9 relative justify-start items-start text- text-gray-700  w-full text-center">
                    Tassel:{" "}
                  </span>
                  <span className="min-w-[250px] absolute flex left-48 ">
                    <CustomDropdown
                      value={editData.tassel}
                      options={tasselOptions}
                      onChange={(val) =>
                        handleEditChange({
                          target: { name: "tassel", value: val },
                        })
                      }
                      disabled={false}
                    />
                  </span>
                </div>
                <div className="flex relative items-center mb-2 w-full">
                  <span className="flex relative right-8 justify-center items-center text- text-gray-700  w-full  text-center">
                    Hood:{" "}
                  </span>

                  <span className="min-w-[250px] absolute flex left-40 ">
                    <CustomDropdown
                      value={editData.hood}
                      options={hoodOptions}
                      onChange={(val) =>
                        handleEditChange({
                          target: { name: "hood", value: val },
                        })
                      }
                      disabled={false}
                    />
                  </span>
                </div>
                <div className="flex relative items-center mb-2 w-full">
                  <span className="flex right-8 relative justify-center items-center text- text-gray-700  w-full text-center">
                    Gown:{" "}
                  </span>
                  <span className="min-w-[200px] absolute flex left-[170px] ">
                    <CustomDropdown
                      value={editData.gown}
                      options={gownOptions}
                      onChange={(val) =>
                        handleEditChange({
                          target: { name: "gown", value: val },
                        })
                      }
                      disabled={false}
                    />
                  </span>
                </div>
                <div className="text- text-gray-700 mb-2">
                  Date: {db.dateofreservation}
                </div>
                <div className="text- text-gray-700 mb-4">
                  Status: {db.status}
                </div>
                <div className="flex gap-2 mt-2 w-full"></div>
                <div className="flex gap-2 mt-4 w-full justify-center">
                  <button
                    className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-blue-800 text-base"
                    onClick={() => handleSave(db.id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-1 bg-[#919191] text-white rounded hover:bg-gray-600 text-base"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-2xl mb-4 text-center">
                  {db.studentname}
                </h3>
                <div className="text- text-gray-700 mb-2">
                  Program: {db.program}
                </div>
                <div className="text- text-gray-700 mb-2">
                  Tassel: {db.tassel}
                </div>
                <div className="text- text-gray-700 mb-2">Hood: {db.hood}</div>
                <div className="text- text-gray-700 mb-2">Gown: {db.gown}</div>
                <div className="text- text-gray-700 mb-2">
                  Date: {db.dateofreservation}
                </div>
                <div className="text- text-gray-700 mb-4">
                  Status: {db.status}
                </div>
                <div className="flex gap-1 mt-20 w-full relative">
                  <div className="relative w-fit  flex justify-center">
                    <button
                      className="w-full h-9 flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 text-base"
                      style={{
                        minWidth: 0,
                        background: modifyTable ? "#bdbdbd" : "#0C7E48",
                        cursor: modifyTable ? "not-allowed" : "pointer",
                      }}
                      disabled={modifyTable}
                      onMouseEnter={() => {
                        setHoveredEyeId(db.id);
                        setPopupMode("hover");
                      }}
                      onMouseLeave={() => {
                        if (popupMode === "hover") setPopupMode("none");
                      }}
                      onClick={() => {
                        setHoveredEyeId(db.id);
                        setPopupUser(db);
                        setPopupOpen(true);
                        setPopupMode("full");
                      }}
                    >
                      <EyeIcon className="w-14" />
                    </button>
                    {/* Small floating popup on hover */}
                    {popupMode === "hover" && hoveredEyeId === db.id && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-12 z-50 w-64 bg-white rounded-lg shadow-lg opacity-100 transition-all duration-300 animate-fade-in pointer-events-auto border border-gray-200"
                        onMouseEnter={() => setPopupMode("hover")}
                        onMouseLeave={() => setPopupMode("none")}
                      >
                        <HoverPopup user={db} />
                      </div>
                    )}
                  </div>
                  <button
                    className="w-full h-9 flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-105 text-base"
                    style={{
                      minWidth: 0,
                      background: modifyTable ? "#bdbdbd" : "#0C7E48",
                      cursor: modifyTable ? "not-allowed" : "pointer",
                    }}
                    disabled={modifyTable}
                    onClick={() => !modifyTable && handleEditClick(db)}
                  >
                    <Table className="w-6" />
                  </button>
                  <button
                    className="w-full h-9 flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-105 ml-2 text-base"
                    style={{ minWidth: 0, background: "#C0392B" }}
                    onClick={() => {
                      /* implement delete logic here */
                    }}
                  >
                    <Trash className="w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridView;
