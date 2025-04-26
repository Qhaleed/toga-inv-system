import React from 'react';
import SideBar from "../sidebar/SideBar";
import NavBar from "../navbar/NavBar";
import {ReactComponent as Table} from "../../assets/icons/table.svg";
import {ReactComponent as EyeIcon} from "../../assets/icons/eye-icon.svg";


const AdminDashboardCard = () => {

    return (
        <div className="h-screen overflow-hidden w-screen fixed bg-linear-primary bg-cover font-figtree font-medium">
            <div className="h-screen fixed w-screen grid grid-cols-4 ">
                <SideBar />
                <div className="col-span-3 h-full border border-red-500"> {/* Navigation */}
                    <NavBar />
                    <div className="h-[590px] mt-2 w-full border border-white flex justify-center">
                        <div class="h-full w-[96%] border border-white">
                        <table className="table-auto border w-full border-gray-400">
                            <thead>
                                <tr className="bg-[#02327B] text-sm text-white h-10">
                                    <th>
                                        <h1 className="border-r border-gray-600">Student Name</h1>
                                    </th>
                                    <th>Program</th>
                                    <th>Cap</th>
                                    <th>Tassel</th>
                                    <th>Hood</th>
                                    <th>Gown</th>
                                    <th>Date of Reservation</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="h-12 bg-[#BAB4B1] text-xs font-normal">
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600">
                                            <h3 className="ml-4"><span className="mr-3">1</span>Kenneth Clyde A. Que</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#0C7E48] text-white w-24 rounded-full">BSCS</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#0C7E48] text-white w-16 rounded-full">XL</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#0C7E48] text-white w-16 rounded-full">XL</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#0C7E48] text-white w-16 rounded-full">XL</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#0C7E48] text-white w-16 rounded-full">XL</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <h3>September 27, 2025</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <h3>Borrowed</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 flex justify-between">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardCard;