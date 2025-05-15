import RedButton from "../../assets/icons/red-x-icon.svg?react";
import { useRef } from "react";
import { useState } from "react";

const EvaluationTab = ({ value, evalTab, setEvaluationTab }) => {
  const formRef = useRef(null);

  const exit = () => {
    setEvaluationTab("hidden");
    resetEvaluationTab();
  };

  //states
  const [evaluationData, setEvaluationData] = useState({
    gown_condition: "",
    gown_repair: "",
    gown_damaged: "",
    gown_remarks: "",

    hood_condition: "",
    hood_repair: "",
    hood_damaged: "",
    hood_remarks: "",

    tassel_condition: "",
    tassel_missing: "",
    tassel_damaged: "",
    tassel_remarks: "",

    cap_condition: "",
    cap_deformed: "",
    cap_remarks: "",

    inventory_id: value.inventory_id,
  });

  const resetEvaluationTab = () => {
    formRef.current.reset(); //resets html values (incase)
    setEvaluationData({
      gown_condition: "",
      gown_repair: "",
      gown_damaged: "",
      gown_remarks: "",

      hood_condition: "",
      hood_repair: "",
      hood_damaged: "",
      hood_remarks: "",

      tassel_condition: "",
      tassel_missing: "",
      tassel_damaged: "",
      tassel_remarks: "",

      cap_condition: "",
      cap_deformed: "",
      cap_remarks: "",

      inventory_id: value.inventory_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    exit();
    try {
      const response = await fetch("http://localhost:5001/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gown_condition: evaluationData.gown_condition,
          gown_repair: evaluationData.gown_repair,
          gown_damage: evaluationData.gown_damaged,
          gown_remarks: evaluationData.gown_remarks,

          hood_condition: evaluationData.hood_condition,
          hood_repair: evaluationData.hood_repair,
          hood_damage: evaluationData.hood_damaged,
          hood_remarks: evaluationData.hood_remarks,

          tassel_condition: evaluationData.tassel_condition,
          tassel_missing: evaluationData.tassel_missing,
          tassel_damage: evaluationData.tassel_damaged,
          tassel_remarks: evaluationData.tassel_remarks,

          cap_condition: evaluationData.cap_condition,
          cap_deform: evaluationData.cap_deformed,
          cap_remarks: evaluationData.cap_remarks,
          inventory_id: value.inventory_id,
        }),
      });
    } catch (error) {
      console.error("Evaluation error:", error);
    }
  };

  const handleChange = (e) => {
    //kinuha ko lang sa code ng registerCard
    const { name, value } = e.target;
    setEvaluationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] ${evalTab}`}
      >
        <div className="absolute h-[600px] w-[450px] bg-[#001C47] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl sm:w-[600px] md:w-[750px] lg:w-[1000px] transition-all duration-200 ease-out">
          <div className="mt-4 h-full w-full flex flex-col justify-start items-center">
            <div className="w-full h-12 flex justify-end">
              <button
                onClick={exit}
                type="button"
                className="hover:scale-110 transition-all duration-200 ease-out"
              >
                <RedButton className="w-10 h-10 mr-4" />
              </button>
            </div>
            <table className="table-auto h-[15%] w-[93%] bg-[#d6d6d6] mt-3 rounded-lg overflow-hidden">
              <thead className="bg-[#02327B]  h-[54%]">
                <tr className="text-white text-[10px] sm:text-xs md:text-sm">
                  <th>
                    <h3 className="border-r border-gray-300">Student Name</h3>
                  </th>
                  <th>Program</th>
                  <th>ID Number</th>
                  <th>Cap</th>
                  <th>Tassel</th>
                  <th>Hood</th>
                  <th>Gown</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center h-[46%] text-[10px] sm:text-xs">
                  <td>
                    <h3 className="border-r border-gray-700">
                      {value.surname +
                        ", " +
                        value.first_name +
                        " " +
                        value.middle_initial +
                        "."}
                    </h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">{value.course}</h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">
                      {value.id_number}
                    </h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">
                      {value.cap ? "Yes" : "No"}
                    </h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">
                      {value.tassel_color}
                    </h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">
                      {value.hood_color}
                    </h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">
                      {value.toga_size}
                    </h3>
                  </td>
                  <td>{value.updated_at}</td>
                </tr>
              </tbody>
            </table>

            <table className="table-auto w-[93%] h-[300px] bg-[#d6d6d6] text-center rounded-lg overflow-hidden mt-4">
              <thead>
                <tr className="bg-[#bebebe] text-[10px] sm:text-xs border-b-2 border-bg-[#d6d6d6] h-20">
                  <td>
                    <h3 className="ml-5">Gown</h3>
                  </td>
                  <td>
                    <select
                      name="gown_condition"
                      value={evaluationData.gown_condition}
                      onChange={handleChange}
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
                      required
                    >
                      <option value="" disabled hidden>
                        In Good Condition
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="gown_repair"
                      value={evaluationData.gown_repair}
                      onChange={handleChange}
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                    >
                      <option value="" disabled hidden>
                        For Repair
                      </option>
                      <option value="None">None</option>
                      <option value="Tastas">Tastas</option>
                      <option value="Run in cloth">Run in cloth</option>
                      <option value="Missing parts">Missing parts</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="gown_damaged"
                      value={evaluationData.gown_damaged}
                      onChange={handleChange}
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                    >
                      <option value="" disabled hidden>
                        Damaged
                      </option>
                      <option value="None">None</option>
                      <option value="Discolored">Discolored</option>
                      <option value="Stained">Stained</option>
                    </select>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                      <label className="mr-1 sm:mr-2 md:mr-3">Remarks: </label>
                      <textarea
                        name="gown_remarks"
                        value={evaluationData.gown_remarks}
                        onChange={handleChange}
                        className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3"
                      />
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Hood",
                    selects: [
                      {
                        name: "hood_condition",
                        placeholder: "In Good Condition",
                        options: ["Yes", "No"],
                      },
                      {
                        name: "hood_repair",
                        placeholder: "For Repair",
                        options: [
                          "None",
                          "Tastas",
                          "Run in cloth",
                          "Missing parts",
                        ],
                      },
                      {
                        name: "hood_damaged",
                        placeholder: "Damaged",
                        options: ["None", "Discolored", "Stained"],
                      },
                    ],
                  },
                  {
                    label: "Tassel",
                    selects: [
                      {
                        name: "tassel_condition",
                        placeholder: "In Good Condition",
                        options: ["Yes", "No"],
                      },
                      {
                        name: "tassel_missing",
                        placeholder: "Missing",
                        options: ["Yes", "No"],
                      },
                      {
                        name: "tassel_damaged",
                        placeholder: "Damaged",
                        options: ["None", "Discolored", "Stained"],
                      },
                    ],
                  },
                  {
                    label: "Cap",
                    selects: [
                      {
                        name: "cap_condition",
                        placeholder: "In Good Condition",
                        options: ["Yes", "No"],
                      },
                      {
                        name: "cap_deformed",
                        placeholder: "Deformed",
                        options: ["Yes", "No"],
                      },
                      {
                        placeholder: "",
                        options: [],
                      },
                    ],
                  },
                ].map((row, idx) => (
                  <tr
                    key={row.label}
                    className={`text-[10px] sm:text-xs h-20 transition-all duration-200 ease-out ${
                      idx % 2 === 0 ? "bg-[#f3f3f3]" : "bg-[#bebebe]"
                    }`}
                  >
                    <td>
                      <h3 className="ml-5">{row.label}</h3>
                    </td>
                    {row.selects.map((select, sidx) => (
                      <td key={sidx}>
                        {select.options.length > 0 ? (
                          <select
                            name={select.name}
                            value={evaluationData[select.name]}
                            onChange={handleChange}
                            className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                          >
                            <option value="" disabled hidden>
                              {select.placeholder}
                            </option>
                            {select.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </td>
                    ))}
                    <td>
                      <div className="flex justify-center items-center">
                        <label className="mr-1 sm:mr-2 md:mr-3">
                          Remarks:{" "}
                        </label>
                        <textarea
                          name={`${row.label.toLowerCase()}_remarks`} //row label _ remarks
                          value={
                            evaluationData[`${row.label.toLowerCase()}_remarks`]
                          } //evaluationData.rowLabel_remarks
                          onChange={handleChange}
                          className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3 transition-all duration-200 ease-out"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="submit"
              className="mt-6 bg-[#F3B51A] w-52 h-12 text-lg font-medium rounded-xl hover:scale-105 transition-all duration-200 ease-out hover:bg-[#588dd3]"
            >
              Evaluate
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EvaluationTab;
