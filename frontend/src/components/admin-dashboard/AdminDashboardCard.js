import React from 'react';
import {useState} from "react";
import {ReactComponent as Home} from "../../assets/icons/purple-house.svg";
import {ReactComponent as Inventory} from "../../assets/icons/inventory-icon.svg";
import {ReactComponent as Search} from "../../assets/icons/searchIcon.svg";
import {ReactComponent as Application} from "../../assets/icons/application.svg";
import {ReactComponent as Arrow} from "../../assets/icons/arrow down.svg";


function AdminDashboardCard() {

    const [isToggle, setToggle] = useState(true);

    return (
        <div className="h-screen bg-linear-primary">
            <div className="h-full border border-red-500 grid grid-cols-4">
                <div className="col-span-1 border border-red-50 h-full">
                    
                </div>
                <div className="col-span-3 border border-red-50 h-full">
                    <div className="border border-red-50 h-36">
                        <div className="border border-red-50 h-1/2 flex justify-start items-center">
                            <button className="hover:scale-110 bg-darkpurple border border-darkpurple flex justify-center items-center w-36 h-7 text-white mr-12 ml-12 rounded-xl transition-all ease-out duration-500">
                                <span><Home className="w-4"></Home></span>
                                <span className="text-xs ml-1 font-figtree font-medium">Dashboard</span>
                            </button>
                            <button className="hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white mx-3 rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500">
                                <span><Inventory className="w-4"></Inventory></span>
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
                        <div className="border border-red-50 h-1/2">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboardCard;