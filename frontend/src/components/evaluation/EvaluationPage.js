import React, { useState } from "react";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";
import EvaluationTable from "../../components/evaluation/EvaluationTable";
import {useEffect} from "react";

const EvaluationPage = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("evaluation");
  const [value, setValue] = useState([]);
  const [EvaluationTab, setEvaluationTab] = useState("hidden");

  useEffect(() => {
      fetch("http://localhost:8000/dashboard")
        .then((res) => res.json())
        .then((data) => {
          setValue(data);
        });
    }, []);

  return (
    <>
    <div className="h-screen overflow-hidden w-screen fixed bg-[#EBEBEB] font-figtree font-medium">
      {/* Responsive: Sidebar above navbar on small screens, left on large screens */}
      <div className="w-full flex flex-col sm:grid sm:grid-cols-4 h-screen">
        {/* Sidebar: full width above navbar on small screens, left on large screens */}
        <div className="w-full sm:col-span-1">
          {/* Always show sidebar on large screens, toggle on small screens */}
          <SideBar alwaysShowOnLarge />
        </div>
        {/* Main content: below sidebar on small screens, right of sidebar on large screens */}
        <div className="flex-1 sm:col-span-3 h-full">
          <div
            className="w-full flex flex-col items-center"
            style={{ maxWidth: "100vw" }}
          >
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "8px" }}
            >
              <NavBar
                isGrid={isGrid}
                setIsGrid={setIsGrid}
                modifyTable={modifyTable}
                setmodifyTable={setmodifyTable}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <EvaluationTable isGrid={isGrid} modifyTable={modifyTable} value={value} setValue={setValue} EvaluationTab={EvaluationTab} setEvaluationTab={setEvaluationTab}/>
          </div>
        </div>
      </div>
    </div>
    <div className={`absolute h-screen w-screen bg-[#000000a2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${EvaluationTab}`}>
      <div className="absolute h-[550px] w-[1000px] bg-[#EBEBEB] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <table className="table-auto h-[15%] w-[93%] bg-[#d6d6d6] border border-gray-400 mt-4">
            <thead className="bg-[#02327B] h-[54%]">
              <tr className="text-white">
                <th><h3 className="border-r border-gray-300">Student Name</h3></th>
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
              <tr className="text-center h-[46%] text-sm">
                <td><h3 className="border-r border-gray-700">{value.studentname}</h3></td>
                <td><h3 className="border-r border-gray-700">{value.program}</h3></td>
                <td><h3 className="border-r border-gray-700">{value.tassel}</h3></td>
                <td><h3 className="border-r border-gray-700">{value.tassel}</h3></td>
                <td><h3 className="border-r border-gray-700">{value.hood}</h3></td>
                <td><h3 className="border-r border-gray-700">{value.gown}</h3></td>
                <td><h3 className="border-r border-gray-700">{value.dateofreservation}</h3></td>
                <td>AUG 1, 2006</td>
              </tr>
            </tbody>
          </table>
          <div className="h-[75%] w-[93%] flex flex-col justify-center items-center mt-2">
            <table className="table-auto w-full h-80 bg-[#d6d6d6] border border-gray-400 text-center">
              <tbody>
                <tr className="bg-[#bebebe]">
                  <td>
                      <h3>Gown</h3>
                  </td>
                  <td>
                    <select >
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select>
                      <option>For Repair</option>
                      <option>None</option>
                      <option>Tastas</option>
                      <option>Run in cloth</option>
                      <option>Missing parts</option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option>Damaged</option>
                      <option>None</option>
                      <option>Discolored</option>
                      <option>Stained</option>
                    </select>
                  </td>
                  <td>
                    <label>Remarks: </label>
                    <input type="text" className="w-40"/>
                  </td>
                </tr>
                <tr className="">
                <td>
                      <h3>Hood</h3>
                  </td>
                  <td>
                    <select>
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select>
                      <option>For Repair</option>
                      <option>None</option>
                      <option>Tastas</option>
                      <option>Run in cloth</option>
                      <option>Missing parts</option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option>Damaged</option>
                      <option>None</option>
                      <option>Discolored</option>
                      <option>Stained</option>
                    </select>
                  </td>
                  <td>
                    <label>Remarks: </label>
                    <input type="text" className="w-40"/>
                  </td>
                </tr>
                <tr className="bg-[#bebebe]">
                <td>
                      <h3>Tassel</h3>
                  </td>
                  <td>
                    <select>
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select>
                      <option>Missing</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option>Damaged</option>
                      <option>None</option>
                      <option>Discolored</option>
                      <option>Stained</option>
                    </select>
                  </td>
                  <td>
                    <label>Remarks: </label>
                    <input type="text" className="w-40"/>
                  </td>
                </tr>
                <tr className="">
                <td>
                      <h3>Cap</h3>
                  </td>
                  <td>
                    <select>
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select>
                      <option>Deformed</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  </td>
                  <td>
                    <label>Remarks: </label>
                    <input type="text" className="w-40"/>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="bg-[#F3B51A] w-48 h-12 text-lg font-medium rounded-xl hover:scale-105 mt-5 transition-all duration-200 ease-out hover:bg-[#588dd3]">Evaluate</button>
          </div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
    </>
    
  );
};

export default EvaluationPage;
