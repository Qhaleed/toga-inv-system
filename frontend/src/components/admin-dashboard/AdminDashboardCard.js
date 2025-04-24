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


function AdminDashboardCard() {

    const [dashboardToggle, setdashboardToggle] = useState(true);
    const [inventoryToggle, setinventoryToggle] = useState(false);

    const switchToggle = () => {
        if(dashboardToggle){
            setdashboardToggle(false);
            setinventoryToggle(true);
        }
        else{
            setdashboardToggle(true);
            setinventoryToggle(false);
        }
    }

    const dashboard = dashboardToggle ? "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white mx-12 rounded-xl transition-all ease-out duration-500" : "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-12 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500";
    const inventory = !inventoryToggle ? "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500" : "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl transition-all ease-out duration-500";

    const houseiconToggle = dashboardToggle ? <Home className="w-4"></Home> : <GrayHouse className="w-4"></GrayHouse>;
    const inventoryiconToggle = !inventoryToggle ? <Inventory className="w-4"></Inventory> : <PurpleInventory className="w-4"></PurpleInventory>;


    return (
        <div className="h-screen bg-linear-primary">
            <div className="h-full border border-red-500 grid grid-cols-4">
                <div className="col-span-1 border border-red-50 h-full">
                    
                </div>
                <div className="col-span-3 border border-red-50 h-full">
                    <div className="border border-red-50 h-32">
                        <div className="border border-red-50 h-1/2 flex justify-start items-center">
                            <button onClick={switchToggle} className={dashboard}>
                                <span>{houseiconToggle}</span>
                                <span className="text-xs ml-1 font-figtree font-medium">Dashboard</span>
                            </button>
                            <button onClick={switchToggle} className={inventory}>
                                <span>{inventoryiconToggle}</span>
                                <span className="text-xs mx-1 font-figtree font-medium">Inventory</span>
                                <span><Arrow className="w-4"></Arrow></span>
                            </button>
                            <button className="hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500">
                                <span><Search className="w-4"></Search></span>
                                <span className="text-xs mx-1 font-figtree font-medium">Pending</span>
                                <span><Arrow className="w-4"></Arrow></span>
                            </button>
                            <button className="hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500">
                                <span><Application className="w-4"></Application></span>
                                <span className="text-xs mx-1 font-figtree font-medium">Evaluation</span>
                                <span><Arrow className="w-4"></Arrow></span>
                            </button>
                        </div>
                        <div className="border border-red-50 h-1/2 flex justify-start items-center">
                            <div className="ml-12 mr-6 w-[600px] hover:scale-105 transform-all ease-out duration-500">
                                <div className="relative">
                                    <Search className="absolute w-8 top-2.5 left-2.5"></Search>
                                </div>
                                <input className="bg-transparent w-full px-10 py-2 text-white rounded-xl border-2 border-purple" type="text" placeholder="Search student..."/>
                            </div>
                            <div className="hover:scale-110 h-10 w-20 bg-darkpurple/70 rounded-xl flex justify-around items-center overflow-hidden transform-all ease-out duration-500 mr-5">
                                <div className="h-10 w-10 flex justify-center items-center rounded-s-xl">
                                    <GrayRows className="w-9 p-1"></GrayRows>
                                </div>
                                <div className="h-10 w-10 border border-purple bg-darkpurple/70 flex justify-center items-center rounded-e-xl">
                                    <PurpleGrid className="w-9 p-1"></PurpleGrid>
                                </div>
                            </div>
                            <button className="hover:scale-105 h-10 w-32 bg-purple rounded-xl text-white transform-all ease-out duration-500">Modify Table</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardCard;