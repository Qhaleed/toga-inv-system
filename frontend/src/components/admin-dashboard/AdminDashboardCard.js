import React from 'react';
import Table from "../common/Table";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";


const AdminDashboardCard = () => {
    return (
        <div className="h-screen overflow-hidden w-screen fixed bg-[#EBEBEB] font-figtree font-medium"> {/*Root Container*/}
            <div className="h-screen fixed w-screen grid grid-cols-4 "> {/*Container of the Left and Right Containers*/}
                <SideBar /> {/* Left Container and SideBar */}
                <div className="col-span-3 h-full"> {/* Right Container */}
                    <NavBar />
                    <Table /> {/*Dashboard Table*/}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardCard;