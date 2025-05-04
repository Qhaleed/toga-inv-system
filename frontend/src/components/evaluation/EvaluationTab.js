import { ReactComponent as RedButton } from "../../assets/icons/red-x-icon.svg";

const EvaluationTab = ({value, evalTab, setEvaluationTab}) => {

    const exit = () => {
        setEvaluationTab("hidden");
    }
    return ( 
        <div className={`absolute h-screen w-screen bg-[#000000a2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${evalTab}`}>
        <div className="absolute h-[600px] w-[1000px] bg-[#001C47] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className="mt-4 h-full w-full flex flex-col justify-start items-center">
            <div className="w-full h-12 flex justify-end">
                <button onClick={exit} className="hover:scale-110 transition-all duration-200 ease-out">
                    <RedButton className="w-10 h-10 mr-4"/>
                </button>
            </div>
            <table className="table-auto h-[15%] w-[93%] bg-[#d6d6d6] mt-3 rounded-lg overflow-hidden">
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
                  <td><h3 className="border-r border-gray-700">{value.id}</h3></td>
                  <td><h3 className="border-r border-gray-700">{value.cap}</h3></td>
                  <td><h3 className="border-r border-gray-700">{value.tassel}</h3></td>
                  <td><h3 className="border-r border-gray-700">{value.hood}</h3></td>
                  <td><h3 className="border-r border-gray-700">{value.gown}</h3></td>
                  <td>{value.dateofreservation}</td>
                </tr>
              </tbody>
            </table>
           <div className="mt-4 h-80 w-[93%] flex flex-col justify-center items-center">
            <table className="table-auto w-full h-full bg-[#d6d6d6] border border-gray-800 text-center rounded-lg overflow-hidden">
              <tbody>
                <tr className="bg-[#bebebe] border-b-2 border-bg-[#d6d6d6]">
                  <td>
                      <h3>Gown</h3>
                  </td>
                  <td>
                    <select className="bg-[#0C7E48] text-white text-sm w-36 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out" required>
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select className="bg-[#0C7E48] text-white text-sm w-32 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>For Repair</option>
                      <option>None</option>
                      <option>Tastas</option>
                      <option>Run in cloth</option>
                      <option>Missing parts</option>
                    </select>
                  </td>
                  <td>
                    <select className="bg-[#0C7E48] text-white text-sm w-32 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>Damaged</option>
                      <option>None</option>
                      <option>Discolored</option>
                      <option>Stained</option>
                    </select>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                        <label className="mr-2">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-52" />
                    </div>
                  </td>
                </tr>
                <tr className="border-b-2 border-bg-[#d6d6d6]">
                <td>
                      <h3>Hood</h3>
                  </td>
                  <td>
                    <select className="bg-[#0C7E48] text-white text-sm w-36 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select className="bg-[#0C7E48] text-white text-sm w-32 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>For Repair</option>
                      <option>None</option>
                      <option>Tastas</option>
                      <option>Run in cloth</option>
                      <option>Missing parts</option>
                    </select>
                  </td>
                  <td>
                  <select className="bg-[#0C7E48] text-white text-sm w-32 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>Damaged</option>
                      <option>None</option>
                      <option>Discolored</option>
                      <option>Stained</option>
                    </select>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                        <label className="mr-2">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-52"/>
                    </div>
                  </td>
                </tr>
                <tr className="bg-[#bebebe] border-b-2 border-bg-[#d6d6d6]">
                <td>
                      <h3>Tassel</h3>
                  </td>
                  <td>
                    <select className="bg-[#0C7E48] text-white text-sm w-36 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select className="bg-[#0C7E48] text-white text-sm w-32 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>Missing</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <select className="bg-[#0C7E48] text-white text-sm w-32 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>Damaged</option>
                      <option>None</option>
                      <option>Discolored</option>
                      <option>Stained</option>
                    </select>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                        <label className="mr-2">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-52" />
                    </div>
                  </td>
                </tr>
                <tr>
                <td>
                      <h3>Cap</h3>
                  </td>
                  <td>
                    <select className="bg-[#0C7E48] text-white text-sm w-36 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>In Good Condition</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  <select className="bg-[#0C7E48] text-white text-sm w-32 text-center rounded-full hover:scale-105 transition-all duration-200 ease-out">
                      <option>Deformed</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                        <label className="mr-2">Remarks: </label>
                        <textarea className="rounded-lg p-1 w-52" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="mt-6 bg-[#F3B51A] w-52 h-12 text-lg font-medium rounded-xl hover:scale-105 transition-all duration-200 ease-out hover:bg-[#588dd3]">Evaluate</button>
        </div>
      </div>
      <div>
      </div>
    </div>
     );
}
 
export default EvaluationTab;