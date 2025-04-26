import Profile from "../../assets/images/profilepicture.jpg";
import {ReactComponent as Calendar} from "../../assets/icons/white-calendar.svg";

/*

    Follow these if you use SideBar and Navbar!

    <div className="h-screen overflow-hidden w-screen fixed bg-linear-primary bg-cover font-figtree font-medium">
        <div className="h-screen fixed w-screen grid grid-cols-4 ">
            <SideBar />
            <div className="col-span-3 h-full">
                <Navbar />
                <-- INPUT YOUR CODE HERE -->
            </div>
        </div>
    </div>    


*/

const SideBar = () => {
    return(
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
                    <div className="w-80 h-[500px] z-10 mt-8 rounded-xl bg-linear-custom border border-violet-900 border-opacity-60 flex flex-col justify-start items-center"> {/* Sidebar */}
                        <div className="w-72 h-64 border border-gray-400 border-opacity-30 mt-4 rounded-xl bg-linear-custom shadow-[0px_6px_10px_4px_rgba(0,0,0,0.15)]  flex flex-col justify-start items-center">
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
    );
}

export default SideBar;