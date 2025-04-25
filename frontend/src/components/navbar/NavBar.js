import {ReactComponent as Home} from "../../assets/icons/purple-house.svg";
import {ReactComponent as Inventory} from "../../assets/icons/inventory-icon.svg";
import {ReactComponent as Search} from "../../assets/icons/searchIcon.svg";
import {ReactComponent as Application} from "../../assets/icons/application.svg";
import {ReactComponent as PurpleGrid} from "../../assets/icons/purple-grid.svg";
import {ReactComponent as GrayRows} from "../../assets/icons/gray-rows.svg";
import {ReactComponent as PurpleInventory} from "../../assets/icons/purple-inventory.svg";
import {ReactComponent as GrayHouse} from "../../assets/icons/gray-house.svg";
import {ReactComponent as Statistic} from "../../assets/icons/white-statistics.svg";
import {ReactComponent as PurpleStatistic} from "../../assets/icons/purple-statistics.svg";
import {ReactComponent as PurpleApplication} from "../../assets/icons/purple-searchcheck.svg";
import {useState} from "react";

const Navbar = () => {

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

    const dashboard = dashboardToggle ? "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex ml-6 justify-center mr-6 items-center w-36 h-7 text-white  rounded-xl transition-all ease-out duration-500" : "hover:scale-110 border border-white mr-6 flex ml-6 justify-center items-center w-36 h-7 text-white  rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500";
    const inventory = !inventoryToggle ? "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 mr-6 text-white rounded-xl opacity-40 hover:opacity-100  transition-all ease-out duration-500" : "hover:scale-110 bg-darkpurple/70 border mr-6 border-darkpurple/70 flex justify-center items-center w-36  h-7 text-white rounded-xl transition-all ease-out duration-500";
    const pending = !pendingToggle ? "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white rounded-xl mr-6 opacity-40 hover:opacity-100 transition-all ease-out duration-500" : "hover:scale-110 bg-darkpurple/70 border mr-6 border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white  rounded-xl hover:opacity-100 transition-all ease-out duration-500";
    const evaluation = !evaluationToggle ? "hover:scale-110 border border-white flex justify-center items-center w-36 h-7 text-white rounded-xl opacity-40 hover:opacity-100 transition-all ease-out duration-500" : "hover:scale-110 bg-darkpurple/70 border border-darkpurple/70 flex justify-center items-center w-36 h-7 text-white rounded-xl hover:opacity-100 transition-all ease-out duration-500";

    const houseiconToggle = dashboardToggle ? <Home className="w-4"></Home> : <GrayHouse className="w-4"></GrayHouse>;
    const inventoryiconToggle = !inventoryToggle ? <Inventory className="w-4"></Inventory> : <PurpleInventory className="w-4"></PurpleInventory>;
    const pendingiconToggle = !pendingToggle ? <Statistic className="w-4"></Statistic> : <PurpleStatistic className="w-4"></PurpleStatistic>;
    const evaluationiconToggle = !evaluationToggle ? <Application className="w-4"></Application> : <PurpleApplication className="w-4"></PurpleApplication>

    return(
        <div className="col-span-3 h-full "> {/* Navigation */}
            <div className="h-32 "> {/* Top Navigation */}
                <div className="h-1/2 flex justify-start items-center "> {/* search Navigation */}
                    <button onClick={switchDashboard} className={dashboard}>
                        <span>{houseiconToggle}</span>
                        <span className="text-xs ml-3">Dashboard</span>
                    </button>
                    <button onClick={switchInventory} className={inventory}>
                        <span>{inventoryiconToggle}</span>
                        <span className="text-xs mx-3">Inventory</span>
                    </button>
                    <button onClick={switchPending} className={pending}>
                        <span>{pendingiconToggle}</span>
                        <span className="text-xs mx-3">Pending</span>
                    </button>
                    <button onClick={switchEvaluation} className={evaluation}>
                        <span>{evaluationiconToggle}</span>
                        <span className="text-xs mx-3">Evaluation</span>
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
    );
}

export default Navbar; 