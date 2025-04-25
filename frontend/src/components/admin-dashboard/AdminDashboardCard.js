import React from 'react';
import SideBar from "../sidebar/SideBar";
import NavBar from "../navbar/NavBar";


const AdminDashboardCard = () => {

    return (
        <div className="h-screen overflow-hidden w-screen fixed bg-linear-primary bg-cover font-figtree font-medium">
            <div className="h-screen fixed w-screen grid grid-cols-4 ">
                <SideBar />
                <NavBar />
            </div>
        </div>
    );
}

export default AdminDashboardCard;