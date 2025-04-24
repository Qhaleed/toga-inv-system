import React from 'react';
import {useState} from "react";
import {ReactComponent as Home} from "../../assets/icons/purple-house.svg";
import {ReactComponent as Inventory} from "../../assets/icons/inventory-icon.svg";
import {ReactComponent as Search} from "../../assets/icons/searchIcon.svg";
import {ReactComponent as Application} from "../../assets/icons/application.svg";
import {ReactComponent as Arrow} from "../../assets/icons/arrow down.svg";
import {ReactComponent as PurpleGrid} from "../../assets/icons/purple-grid.svg";
import {ReactComponent as GrayRows} from "../../assets/icons/gray-rows.svg";
import {ReactComponent as PurpleInventory} from "../../assets/icons/purple-inventory.svg";
import {ReactComponent as GrayHouse} from "../../assets/icons/gray-house.svg";
import {ReactComponent as Calendar} from "../../assets/icons/white-calendar.svg";
import {ReactComponent as Statistic} from "../../assets/icons/white-statistics.svg";
import {ReactComponent as PurpleStatistic} from "../../assets/icons/purple-statistics.svg";
import {ReactComponent as PurpleApplication} from "../../assets/icons/purple-searchcheck.svg";
import Profile from "../../assets/images/profilepicture.jpg";


function AdminDashboardCard() {

    // TOGGLE EFFECTS

    const [dashboardToggle, setdashboardToggle] = useState(true);
    const [inventoryToggle, setinventoryToggle] = useState(false);
    const [pendingToggle, setpendingToggle] = useState(false);
    const [evaluationToggle, setevaluationToggle] = useState(false);

    const switchDashboard = () => {
        setdashboardToggle(true);
        setinventoryToggle(false);
        setpendingToggle(false);
        setevaluationToggle(false);
    }
    const switchInventory = () => {
        setdashboardToggle(false);
        setinventoryToggle(true);
        setpendingToggle(false);
        setevaluationToggle(false);
    }

    const switchPending = () => {
        setdashboardToggle(false);
        setinventoryToggle(false);
        setpendingToggle(true);
        setevaluationToggle(false);
    }

    const switchEvaluation = () => {
        setdashboardToggle(false);
        setinventoryToggle(false);
        setpendingToggle(false);
        setevaluationToggle(true);
    }

    const dashboard = dashboardToggle ? "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white ml-6 mr-12 rounded-xl transition-all ease-out duration-500" : "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white ml-6 mr-12 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500";
    const inventory = !inventoryToggle ? "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500" : "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl transition-all ease-out duration-500";
    const pending = !pendingToggle ? "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500" : "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl hover:opacity-100 transition-all ease-out duration-500";
    const evaluation = !evaluationToggle ? "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500" : "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl hover:opacity-100 transition-all ease-out duration-500";

    const houseiconToggle = dashboardToggle ? <Home className="w-4"></Home> : <GrayHouse className="w-4"></GrayHouse>;
    const inventoryiconToggle = !inventoryToggle ? <Inventory className="w-4"></Inventory> : <PurpleInventory className="w-4"></PurpleInventory>;
    const pendingiconToggle = !pendingToggle ? <Statistic className="w-4"></Statistic> : <PurpleStatistic className="w-4"></PurpleStatistic>;
    const evaluationiconToggle = !evaluationToggle ? <Application className="w-4"></Application> : <PurpleApplication className="w-4"></PurpleApplication>


    return (
        <div className="h-screen w-screen bg-linear-primary bg-cover bg-fixed font-figtree font-medium">
            <div className="h-full w-full grid grid-cols-4">
                <div className="col-span-1 h-full flex flex-col justify-start items-center">
                    <div className="w-80 h-28 border border-violet-950 mt-5 rounded-xl bg-linear-custom bg-center flex">
                        <div className="ml-4 h-full w-16 flex justify-center items-center">
                            <img className="w-16 rounded-full" src={Profile} alt="profile"/>
                        </div>
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
                    <div className="w-80 h-[500px] mt-5 rounded-xl bg-linear-custom bg-center border border-violet-900 border-opacity-60 flex flex-col justify-start items-center">
                        <div className="w-72 h-64 border border-gray-400 border-opacity-30 mt-4 rounded-xl bg-linear-custom shadow-[0px_6px_10px_4px_rgba(0,0,0,0.15)] flex flex-col justify-start items-center">
                            <div className="m-2 mb-1 w-64 h-1/2">
                                <h4 className="text-gray-400 text-xs mt-1">ITEM STATUS</h4>
                                <div className="w-full h-[90px]">
                                    <div className="w-full h-1/2 flex justify-between items-center">
                                        <button className="w-[121px] h-7 rounded-md flex justify-between items-center bg-indigo-900 border border-purple hover:scale-105 transform-all ease-out duration-500">
                                            <p className="text-[10px] text-white ml-3">All</p>
                                            <div className="text-[10px] bg-gray-50 bg-opacity-10 rounded-lg text-purple mr-3 px-2">123</div>
                                        </button>
                                        <button className="w-[121px] h-7 rounded-md flex justify-between items-center bg-indigo-950 border border-gray-500 hover:border-gray-300 transform-all ease-out duration-500 hover:scale-105">
                                            <p className="text-[10px] text-white ml-3">Borrowed</p>
                                            <div className="text-[10px] bg-gray-400 bg-opacity-40 rounded-lg text-white mr-3 px-2">13</div>
                                        </button>
                                    </div>
                                    <div className="w-full h-1/2 flex justify-between items-center">
                                        <button className="w-[121px] h-7 rounded-md flex justify-between items-center bg-indigo-950 border border-gray-500 hover:border-gray-300 transform-all ease-out duration-500 hover:scale-105">
                                            <p className="text-[10px] text-white ml-3">Returned</p>
                                            <div className="text-[10px] bg-gray-400 bg-opacity-40 rounded-lg text-white mr-3 px-2">19</div>
                                        </button>
                                        <button className="w-[121px] h-7 rounded-md flex justify-between items-center bg-indigo-950 border border-gray-500 hover:border-gray-300 transform-all ease-out duration-500 hover:scale-105">
                                            <p className="text-[10px] text-white ml-3">Requests</p>
                                            <div className="text-[10px] bg-gray-400 bg-opacity-40 rounded-lg text-white mr-3 px-2">23</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="m-2 mt-1 w-64 h-1/2">
                                <h4 className="text-gray-400 text-xs mt-1">SORT BY</h4>
                                <div className="w-full h-[90px]">
                                    <div className="w-full h-1/2 flex justify-between items-center">
                                        <button className="w-[121px] h-7 rounded-md bg-indigo-900 border border-purple flex justify-between items-center hover:scale-105 transform-all ease-out duration-500">
                                            <p className="text-[10px] text-white ml-3">Name</p>
                                            <p className="text-[10px] text-gray-400 mr-3">(A - Z)</p>
                                        </button>
                                        <button className="w-[121px] h-7 rounded-md flex justify-between items-center bg-indigo-950 border border-gray-500 hover:border-gray-300 transform-all ease-out duration-500 hover:scale-105">
                                            <p className="text-[10px] text-white ml-3">Date</p>
                                            <p className="text-[10px] text-gray-400 mr-3">(Newest)</p>
                                        </button>
                                    </div>
                                    <div className="w-full h-1/2 flex justify-start items-center">
                                        <button className="w-[121px] h-7 rounded-md  flex justify-between items-center bg-indigo-950 border border-gray-500 hover:border-gray-300 transform-all ease-out duration-500 hover:scale-105">
                                            <p className="text-[10px] text-white ml-3">Date</p>
                                            <p className="text-[10px] text-gray-400 mr-3">(Oldest)</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-3 h-full">
                    <div className="h-32">
                        <div className="h-1/2 flex justify-start items-center">
                            <button onClick={switchDashboard} className={dashboard}>
                                <span>{houseiconToggle}</span>
                                <span className="text-xs ml-1">Dashboard</span>
                            </button>
                            <button onClick={switchInventory} className={inventory}>
                                <span>{inventoryiconToggle}</span>
                                <span className="text-xs mx-1">Inventory</span>
                                <span><Arrow className="w-4"></Arrow></span>
                            </button>
                            <button onClick={switchPending} className={pending}>
                                <span>{pendingiconToggle}</span>
                                <span className="text-xs mx-1">Pending</span>
                                <span><Arrow className="w-4"></Arrow></span>
                            </button>
                            <button onClick={switchEvaluation} className={evaluation}>
                                <span>{evaluationiconToggle}</span>
                                <span className="text-xs mx-1">Evaluation</span>
                                <span><Arrow className="w-4"></Arrow></span>
                            </button>
                        </div>
                        <div className="h-1/2 flex justify-start items-center">
                            <div className="ml-6 mr-6 w-[600px] transform-all ease-out duration-500">
                                <div className="relative">
                                    <Search className="absolute w-8 top-2.5 left-2.5"></Search>
                                </div>
                                <input className="bg-transparent w-full px-10 py-2 text-white rounded-xl border-2 border-gray-300 hover:border-gray-500 focus:border-purple outline-none transform-all ease-out duration-500" type="text" placeholder="Search student..."/>
                            </div>
                            <div className="hover:scale-110 h-10 w-20 bg-darkpurple/70 rounded-xl flex justify-around items-center overflow-hidden transform-all ease-out duration-500 mr-5">
                                <div className="h-10 w-10 flex justify-center items-center rounded-s-xl">
                                    <GrayRows className="w-9 p-1"></GrayRows>
                                </div>
                                <div className="h-10 w-10 border border-purple bg-darkpurple/70 flex justify-center items-center rounded-e-xl">
                                    <PurpleGrid className="w-9 p-1"></PurpleGrid>
                                </div>
                            </div>
                            <button className="hover:scale-105 h-10 w-40 bg-purple rounded-xl text-white transform-all ease-out duration-500">Modify Table</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardCard;