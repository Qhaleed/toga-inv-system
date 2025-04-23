import React from 'react';
import {ReactComponent as Home} from "../../assets/icons/house.svg";
import {ReactComponent as Inventory} from "../../assets/icons/inventory-icon.svg";
import {ReactComponent as Search} from "../../assets/icons/searchIcon.svg";
import {ReactComponent as Application} from "../../assets/icons/application.svg";
import {ReactComponent as Arrow} from "../../assets/icons/arrow down.svg";


function AdminDashboardCard() {
    return (
        <div class="h-screen bg-linear-primary">
            <div class="h-full border border-red-500 grid grid-cols-4">
                <div class="col-span-1 border border-red-50 h-full">
                    
                </div>
                <div class="col-span-3 border border-red-50 h-full">
                    <div class="border border-red-50 h-36">
                        <div class="border border-red-50 h-1/2 flex justify-start items-center">
                            <div class="border border-white flex justify-center items-center w-40 h-10 text-white mr-3 ml-10 rounded-full">
                                <span><Home></Home></span>
                                <span>Dashboard</span>
                                <span><Arrow></Arrow></span>
                            </div>
                            <div class="border border-white flex justify-center items-center w-40 h-10 text-white mx-3 rounded-full">
                                <span><Inventory></Inventory></span>
                                <span>Inventory</span>
                                <span><Arrow></Arrow></span>
                            </div>
                            <div class="border border-white flex justify-center items-center w-40 h-10 text-white mx-3 rounded-full">
                                <span><Search></Search></span>
                                <span>Pending</span>
                                <span><Arrow></Arrow></span>
                            </div>
                            <div class="border border-white flex justify-center items-center w-40 h-10 text-white mx-3 rounded-full">
                                <span><Application></Application></span>
                                <span>Evaluation</span>
                                <span><Arrow></Arrow></span>
                            </div>
                        </div>
                        <div class="border border-red-50 h-1/2">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboardCard;