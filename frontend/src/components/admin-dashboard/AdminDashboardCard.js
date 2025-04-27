import React from 'react';
<<<<<<< HEAD
import {useState} from "react";
import {ReactComponent as Home} from "../../assets/icons/purple-house.svg";
import {ReactComponent as Inventory} from "../../assets/icons/inventory-icon.svg";
import {ReactComponent as Search} from "../../assets/icons/searchIcon.svg";
import {ReactComponent as Application} from "../../assets/icons/application.svg";
import {ReactComponent as PurpleGrid} from "../../assets/icons/purple-grid.svg";
import {ReactComponent as GrayRows} from "../../assets/icons/gray-rows.svg";
import {ReactComponent as PurpleInventory} from "../../assets/icons/purple-inventory.svg";
import {ReactComponent as GrayHouse} from "../../assets/icons/gray-house.svg";
import {ReactComponent as Calendar} from "../../assets/icons/white-calendar.svg";
import {ReactComponent as Statistic} from "../../assets/icons/white-statistics.svg";
import {ReactComponent as PurpleStatistic} from "../../assets/icons/purple-statistics.svg";
import {ReactComponent as PurpleApplication} from "../../assets/icons/purple-searchcheck.svg";
import Profile from "../../assets/images/profilepicture.jpg";
=======
import SideBar from "../sidebar/SideBar";
import NavBar from "../navbar/NavBar";
import {ReactComponent as Table} from "../../assets/icons/table.svg";
import {ReactComponent as EyeIcon} from "../../assets/icons/eye-icon.svg";
>>>>>>> ab30efe937e66cab53d1fae7ba87cc8d713e307a


const AdminDashboardCard = () => {

    return (
<<<<<<< HEAD
        <div className="h-screen overflow-hidden w-screen  fixed bg-linear-primary bg-cover font-figtree font-medium">
            <div className="h-screen  fixed w-screen grid grid-cols-4 ">
                <div className="col-span-1 h-full flex flex-col justify-start items-center">
                    <div className="w-80 h-28 border border-violet-950 mt-5 rounded-xl bg-linear-custom bg-center flex">
                        <div className="ml-4 h-full w-16 flex justify-center items-center">
                            <img className="w-16 rounded-full" src={Profile} alt="profile"/>
                        </div>``
                        <div className="ml-3 h-full w-36 flex flex-col justify-center items-start text-white">
                            <h4 className="font-bold">Joshua Guiritan</h4>
                            <p className="text-xs font-light">Administator</p>
                            <p className="text-xs font-light">UI/UX Designer</p>
                        </div>
                        <div className="h-full w-20 flex justify-end items-center"> 
                            <button className="bg-violet-950 hover:bg-violet-900 hover:scale-105 h-12 w-12 rounded-full flex justify-center items-center mr-3 border border-gray-700 transform-all ease-out duration-500">
                                <Calendar className="w-6"></Calendar>
                                <div className="relative">
                                    <div className="bg-purple rounded-full text-white text-xs absolute px-1 bottom-2">4</div>
                                </div>
                            </button>
                        </div>
                            
                    </div>
=======
        <div className="h-screen overflow-hidden w-screen fixed bg-[#EBEBEB] font-figtree font-medium">
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
                                        <div className="h-full w-full py-2 flex justify-around">
                                            <button className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md"><EyeIcon className="w-5" /></button>
                                            <button className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md"><Table className="w-5" /></button>
                                        </div>
                                    </td>
                                </tr>
>>>>>>> ab30efe937e66cab53d1fae7ba87cc8d713e307a

                                <tr className="h-12 bg-[#E9E9E9] text-xs font-normal">
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600">
                                            <h3 className="ml-4"><span className="mr-3">1</span>Kenneth Clyde A. Que</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#D2D2D2] text-black border border-black w-24 rounded-full">BSCS</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#D2D2D2] text-black border border-black w-16 rounded-full">XL</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#D2D2D2] text-black border border-black w-16 rounded-full">XL</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#D2D2D2] text-black border border-black w-16 rounded-full">XL</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                                            <button className="bg-[#D2D2D2] text-black border border-black w-16 rounded-full">XL</button>
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
                                        <div className="h-full w-full py-2 flex justify-around">
                                            <button className="w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md"><EyeIcon className="w-5" /></button>
                                            <button className="w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md"><Table className="w-5" /></button>
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