import {ReactComponent as Table} from "../../assets/icons/table.svg";
import {ReactComponent as EyeIcon} from "../../assets/icons/eye-icon.svg";
import {ReactComponent as Trash} from "../../assets/icons/trash.svg";
import {ReactComponent as BlackTable} from "../../assets/icons/black-table.svg";
import {ReactComponent as BlackEyeIcon} from "../../assets/icons/black-eye-icon.svg";
import {ReactComponent as BlackTrash} from "../../assets/icons/black-trash.svg";
import {useState, useEffect} from "react";

const Rows = () => {

    const [dashboard, setDashboard] = useState([]);

    useEffect(() => { {/*Renders data from json file to the rows*/}
        fetch("http://localhost:8000/dashboard")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setDashboard(data);
        })
    },[]);

    const SwitchMode = (id) => { {/*switching function*/}
        setDashboard(dashboard.map((item) =>
        item.id === id ? {...item, eye: item.eye === "block" ? "hidden" : "block", trash: item.trash === "hidden" ? "block" : "hidden"} : item
        )
      );
    }

    return(
        <tbody> 
        {dashboard.map((db) => 
            db.id % 2 !== 0 ? (
                    <tr className="h-12 bg-[#BAB4B1] text-xs font-normal" key={db.id}> {/*Condition for different colored rows*/} {/*ODD COLORED ROWS*/}
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600">
                                <h3 className="ml-4">{db.studentname}</h3> {/*STUDENT NAME*/}
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className="text-black">{db.program}</h3> {/*PROGRAM*/}
                            </div>
                        </td>
                        <td>
                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className={`text-black ${db.eye}`}>{db.tassel}</h3>
                                <select className={`bg-[#0C7E48] text-white w-16 rounded-full text-center ${db.trash}`}>
                                    <option className="text-center" disabled selected hidden>{db.tassel}</option> {/*TASSEL*/}
                                    <option className="text-center">Blue</option>
                                    <option className="text-center">Maroon</option>
                                    <option className="text-center">Orange</option>
                                    <option className="text-center">White</option>
                                    <option className="text-center">Yellow</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className={`text-black ${db.eye}`}>{db.hood}</h3>
                                <select className={`bg-[#0C7E48] text-white w-16 rounded-full text-center ${db.trash}`}>
                                    <option className="text-center" disabled selected hidden>{db.hood}</option> {/*HOOD*/}
                                    <option className="text-center">Blue</option>
                                    <option className="text-center">Maroon</option>
                                    <option className="text-center">Orange</option>
                                    <option className="text-center">White</option>
                                    <option className="text-center">Yellow</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className={`text-black" ${db.eye}`}>{db.gown}</h3>
                                <select className={`bg-[#0C7E48] text-white w-16 rounded-full text-center ${db.trash}`}> {/*GOWN*/}
                                    <option className="text-center" disabled selected hidden>{db.gown}</option>
                                    <option className="text-center">XS</option>
                                    <option className="text-center">S</option>
                                    <option className="text-center">M</option>
                                    <option className="text-center">L</option>
                                    <option className="text-center">XL</option>
                                    <option className="text-center">2XL</option>
                                    <option className="text-center">3XL</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3>{db.dateofreservation}</h3> {/*DATE OF RESERVATION*/}
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className={`text-black ${db.eye}`}>{db.status}</h3>
                                <select className={`bg-[#0C7E48] text-white w-28 rounded-full text-center ${db.trash}`}> {/*STATUS*/}
                                    <option className="text-center" disabled selected hidden>{db.status}</option>
                                    <option className="text-center">Borrowed</option>
                                    <option className="text-center">Not Borrowed</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 flex justify-evenly">
                                <button className={`w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md ${db.eye}`}><EyeIcon className="w-5" /></button> {/*BUTTONS FOR CUSTOMIZATION*/}
                                <button className={`w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md ${db.trash}`}><Trash className="w-4" /></button>
                                <button className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md" onClick={() =>SwitchMode(db.id)}><Table className="w-5" /></button>
                            </div>
                        </td>
                    </tr>
                ) : (
                    <tr className="h-12 bg-[#E9E9E9] text-xs font-normal"> {/*else EVEN COLORED ROWS*/}
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600">
                                <h3 className="ml-4">{db.studentname}</h3> {/*STUDENT NAME*/}
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className="text-black">{db.program}</h3>{/*PROGRAM*/}
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className={`text-black ${db.eye}`}>{db.tassel}</h3>
                                <select className={`bg-[#D2D2D2] text-black border border-black w-16 rounded-full text-center ${db.trash}`}> {/*TASSEL*/}
                                    <option className="text-center" disabled selected hidden>{db.tassel}</option>
                                    <option className="text-center">Blue</option>
                                    <option className="text-center">Maroon</option>
                                    <option className="text-center">Orange</option>
                                    <option className="text-center">White</option>
                                    <option className="text-center">Yellow</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className={`text-black ${db.eye}`}>{db.hood}</h3>
                                <select className={`bg-[#D2D2D2] text-black border border-black w-16 rounded-full text-center ${db.trash}`}>
                                    <option className="text-center" disabled selected hidden>{db.hood}</option> {/*HOOD*/}
                                    <option className="text-center">Blue</option>
                                    <option className="text-center">Maroon</option>
                                    <option className="text-center">Orange</option>
                                    <option className="text-center">White</option>
                                    <option className="text-center">Yellow</option>
                                </select>
                            </div>
                        </td>
                        <td>
                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                <h3 className={`text-black ${db.eye}`}>{db.gown}</h3>
                                <select className={`bg-[#D2D2D2] text-black border border-black w-16 rounded-full text-center ${db.trash}`}>
                                    <option className="text-center" disabled selected hidden>{db.gown}</option> {/*GOWN*/}
                                    <option className="text-center">XS</option>
                                    <option className="text-center">S</option>
                                    <option className="text-center">M</option>
                                    <option className="text-center">L</option>
                                    <option className="text-center">XL</option>
                                    <option className="text-center">2XL</option>
                                    <option className="text-center">3XL</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center"> {/*DATE OF RESERVATION*/}
                                <h3>{db.dateofreservation}</h3>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center"> {/*STATUS*/}
                                <h3 className={`text-black ${db.eye}`}>{db.status}</h3>
                                <select className={`bg-[#D2D2D2] text-black border border-black w-28 rounded-full text-center ${db.trash}`}>
                                    <option className="text-center" disabled selected hidden>{db.status}</option>
                                    <option className="text-center">Borrowed</option>
                                    <option className="text-center">Not Borrowed</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className="h-full w-full py-2 flex justify-evenly">
                                <button className={`w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md ${db.eye}`}><BlackEyeIcon className="w-5" /></button> {/*BUTTONS FOR CUSTOMIZATION*/}
                                <button className={`w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md ${db.trash}`}><BlackTrash className="w-4" /></button>
                                <button className="w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md" onClick={() => {SwitchMode(db.id)}}><BlackTable className="w-5" /></button>
                            </div>
                        </td>
                    </tr>
                )
        )}
            </tbody>
    );
}

export default Rows;