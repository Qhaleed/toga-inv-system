import { ReactComponent as RedButton } from "../../assets/icons/red-x-icon.svg";
import { useRef, useState, useEffect } from "react";
import "./EvaluationTab.css";

const EvaluationTab = ({ value, evalTab, setEvaluationTab }) => {
  const formRef = useRef(null);

  const exit = () => {
    setEvaluationTab("hidden");
    formRef.current.reset();
  };

  const [gown, setGown] = useState({
    condition: "",
    repair: "",
    damage: "",
    remarks: ""
  });
  const [hood, setHood] = useState({
    condition: "",
    repair: "",
    damage: "",
    remarks: ""
  });
  const [tassel, setTassel] = useState({
    condition: "",
    missing: "",
    damage: "",
    remarks: ""
  });
  const [cap, setCap] = useState({
    condition: "",
    deform: "",
    remarks: ""
  });

  const handleSubmit = () => {
    fetch(`http://localhost:8000/dashboard/${value.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gowncondition: gown.condition,
        gownrepair: gown.repair,
        gowndamage: gown.damage,
        gownremarks: gown.remarks,
        hoodcondition: hood.condition,
        hoodrepair: hood.repair,
        hooddamage: hood.damage,
        hoodremarks: hood.remarks,
        tasselcondition: tassel.condition,
        tasselmissing: tassel.missing,
        tasseldamage: tassel.damage,
        tasselremarks: tassel.remarks,
        capcondition: cap.condition,
        capdeform: cap.deform,
        capremarks: cap.remarks,
      }),
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div
        className={`absolute h-screen w-screen bg-[#000000a2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${evalTab}`}
      >
        <div className="absolute h-[600px] w-[450px] bg-[#001C47] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl sm:w-[600px] md:w-[750px] lg:w-[1000px] transition-all duration-200 ease-out EvalTab">
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
            <table className="table-fixed h-[15%] w-[93%] bg-[#d6d6d6] mt-3 rounded-lg overflow-hidden">
              <thead className="bg-[#02327B] h-[54%] sticky">
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
                    <td> {/* Gown Condition */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
                        required
                        value = {gown.condition}
                        onChange = {(e) => setGown({...gown, condition: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          In Good Condition
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td> {/* Gown Repair */}
                      <select 
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                        required
                        value = {gown.repair}
                        onChange = {(e) => setGown({...gown, repair: e.target.value})}
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
                    <td> {/* Gown Damaged */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                        required
                        value = {gown.damage}
                        onChange = {(e) => setGown({...gown, damage: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          Damaged
                        </option>
                        <option value="None">None</option>
                        <option value="Discolored">Discolored</option>
                        <option value="Stained">Stained</option>
                      </select>
                    </td>
                    <td> {/* Gown Remarks */}
                      <div className="flex justify-center items-center">
                        <label className="mr-1 sm:mr-2 md:mr-3">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3" 
                        value = {gown.remarks}
                        onChange = {(e) => setGown({...gown, remarks: e.target.value})}
                        />
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-bg-[#d6d6d6] text-[10px] sm:text-xs h-20 transition-all duration-200 ease-out">
                    <td>
                      <h3 className="ml-5">Hood</h3>
                    </td>
                    <td> {/* Hood Condition */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
                        required
                        value = {hood.condition}
                        onChange = {(e) => setHood({...hood, condition: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          In Good Condition
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td> {/* Gown Repair */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                        required
                        value = {hood.repair}
                        onChange = {(e) => setHood({...hood, repair: e.target.value})}
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
                    <td> {/* Gown Damage */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                        required
                        value = {hood.damage}
                        onChange = {(e) => setHood({...hood, damage: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          Damaged
                        </option>
                        <option value="None">None</option>
                        <option value="Discolored">Discolored</option>
                        <option value="Stained">Stained</option>
                      </select>
                    </td>
                    <td> {/* Gown Remarks */}
                      <div className="flex justify-center items-center">
                        <label className="mr-1 sm:mr-2 md:mr-3">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3 transition-all duration-200 ease-out"
                        value = {hood.remarks}
                        onChange = {(e) => setHood({...hood, remarks: e.target.value})}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-[#bebebe] border-b-2 border-bg-[#d6d6d6] text-[10px] sm:text-xs h-20">
                    <td>
                      <h3 className="ml-5">Tassel</h3>
                    </td>
                    <td> {/* Tassel Condition */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
                        required
                        value = {tassel.condition}
                        onChange = {(e) => setTassel({...tassel, condition: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          In Good Condition
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td> {/* Tassel Missing */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                        required
                        value = {tassel.missing}
                        onChange = {(e) => setTassel({...tassel, missing: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          Missing
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td> {/* Tassel Damage */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                        required
                        value = {tassel.damage}
                        onChange = {(e) => setTassel({...tassel, damage: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          Damaged
                        </option>
                        <option value="None">None</option>
                        <option value="Discolored">Discolored</option>
                        <option value="Stained">Stained</option>
                      </select>
                    </td> 
                    <td> {/* Tassel Remarks */}
                      <div className="flex justify-center items-center">
                        <label className="mr-1 sm:mr-2 md:mr-3">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3 transition-all duration-200 ease-out" 
                        value = {tassel.remarks}
                        onChange = {(e) => setTassel({...tassel, remarks: e.target.value})}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="text-[10px] sm:text-xs h-20">
                    <td>
                      <h3 className="ml-5">Cap</h3>
                    </td>
                    <td> {/* Cap Condition */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-32 lg:w-36"
                        required
                        value = {cap.condition}
                        onChange = {(e) => setCap({...cap, condition: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          In Good Condition
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td> {/* Cap Deformed */}
                      <select
                        defaultValue=""
                        className="bg-[#0C7E48] text-white text-[8px] sm:text-xs text-center rounded-full hover:bg-[#1a6643] transition-all duration-200 ease-out md:w-28 lg:w-36"
                        required
                        value = {cap.deform}
                        onChange = {(e) => setCap({...cap, deform: e.target.value})}
                      >
                        <option value="" disabled hidden>
                          Deformed
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td> {/* Cap Remarks */}
                    <td></td>
                    <td>
                      <div className="flex justify-center items-center">
                        <label className="mr-1 sm:mr-2 md:mr-3">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-20 sm:w-28 md:w-36 lg:w-44 mr-3 transition-all duration-200 ease-out" 
                       value = {cap.remarks}
                       onChange = {(e) => setCap({...cap, remarks: e.target.value})}
                       />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            <button
              type="submit"
              className="mt-6 bg-[#F3B51A] w-52 h-12 text-lg font-medium rounded-xl hover:scale-105 transition-all duration-200 ease-out hover:bg-[#588dd3] active:bg-white"
            >
              Evaluate
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EvaluationTab;
