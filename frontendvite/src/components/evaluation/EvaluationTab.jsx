import RedButton from "../../assets/icons/red-x-icon.svg?react";
import { useRef } from "react";

const EvaluationTab = ({ value, evalTab, setEvaluationTab }) => {
  const formRef = useRef(null);

  const exit = () => {
    setEvaluationTab("hidden");
    formRef.current.reset();
  };

  return (
    <form ref={formRef}>
      <div
        className={`absolute h-screen w-screen bg-[#000000a2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${evalTab}`}
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
              <thead className="bg-[#02327B] h-[54%]">
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
                      {value.studentname}
                    </h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">
                      {value.program}
                    </h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">{value.id}</h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">{value.cap}</h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">{value.tassel}</h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">{value.hood}</h3>
                  </td>
                  <td>
                    <h3 className="border-r border-gray-700">{value.gown}</h3>
                  </td>
                  <td>{value.dateofreservation}</td>
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3" />
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-bg-[#d6d6d6] text-[10px] sm:text-xs h-20 transition-all duration-200 ease-out">
                  <td>
                    <h3 className="ml-5">Hood</h3>
                  </td>
                  <td>
                    <select
                      defaultValue=""
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
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
                      defaultValue=""
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
                      defaultValue=""
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
                      <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3 transition-all duration-200 ease-out" />
                    </div>
                  </td>
                </tr>
                <tr className="bg-[#bebebe] border-b-2 border-bg-[#d6d6d6] text-[10px] sm:text-xs h-20">
                  <td>
                    <h3 className="ml-5">Tassel</h3>
                  </td>
                  <td>
                    <select
                      defaultValue=""
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
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
                      defaultValue=""
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                    >
                      <option value="" disabled hidden>
                        Missing
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      defaultValue=""
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
                      <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3 transition-all duration-200 ease-out" />
                    </div>
                  </td>
                </tr>
                <tr className="text-[10px] sm:text-xs h-20">
                  <td>
                    <h3 className="ml-5">Cap</h3>
                  </td>
                  <td>
                    <select
                      defaultValue=""
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
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
                      defaultValue=""
                      className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                    >
                      <option value="" disabled hidden>
                        Deformed
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                  <td></td>
                  <td>
                    <div className="flex justify-center items-center">
                      <label className="mr-1 sm:mr-2 md:mr-3">Remarks: </label>
                      <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3 transition-all duration-200 ease-out" />
                    </div>
                  </td>
                </tr>
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
