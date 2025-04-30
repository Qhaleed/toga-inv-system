import Profile from "../../assets/images/profilepicture.jpg";
import {ReactComponent as Calendar} from "../../assets/icons/black-calendar.svg";
import {useState} from "react";

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
102F5E
001C47
F3B51A

*/

const SideBar = () => {

    const [all, setAll] = useState(true);
    const [borrowed, setBorrowed] = useState(false);
    const [returned, setReturned] = useState(false);
    const [requests, setRequests] = useState(false);
    const [name, setName] = useState(false);
    const [dateNew, setdateNew] = useState(false);
    const [dateOld, setdateOld] = useState(false);

    const allClicked = () => {
        setAll(true);
        setBorrowed(false);
        setReturned(false);
        setRequests(false);
    }
    const borrowedClicked = () => {
        setAll(false);
        setBorrowed(true);
        setReturned(false);
        setRequests(false);
    }
    const returnedClicked = () => {
        setAll(false);
        setBorrowed(false);
        setReturned(true);
        setRequests(false);
    }
    const requestsClicked = () => {
        setAll(false);
        setBorrowed(false);
        setReturned(false);
        setRequests(true);
    }
    const nameClicked = () => {
        if(!name){
            setName(true);
            setdateNew(false);
            setdateOld(false);
        }
        else{
            setName(false);
            setdateNew(false);
            setdateOld(false);
        }
    }
    const dateNewClicked = () => {
        if(!dateNew){
            setName(false);
            setdateNew(true);
            setdateOld(false);
        }
        else{
            setName(false);
            setdateNew(false);
            setdateOld(false);
        }
    }
    const dateOldClicked = () => {
        if(!dateOld){
            setName(false);
            setdateNew(false);
            setdateOld(true);
        }
        else{
            setName(false);
            setdateNew(false);
            setdateOld(false);
        }
    }

    return(
        <div className="col-span-1 h-full flex flex-col justify-start items-center bg-[#001C47]">
            <div className="w-full h-28 bg-[#102F5E] bg-center flex justify-between">
                <div className="flex justify-center">
                    <div className="h-full ml-4 w-16 flex justify-center items-center ">
                        <img className="w-16 rounded-full" src={Profile} alt="profile"/>
                    </div>
                    <div className="h-full ml-3 flex flex-col justify-center items-start text-white">
                        <h4 className="font-bold">Joshua Guiritan</h4>
                        <p className="text-xs font-light">Administator</p>
                        <p className="text-xs font-light">UI/UX Designer</p>
                    </div>
                </div>
                <div className="h-full flex justify-end items-center mr-6"> 
                    <button className="bg-[#F3B51A] hover:bg-[#dc9f2d] hover:scale-105 h-12 w-12 rounded-full flex justify-center items-center border border-gray-700 transform-all ease-out duration-500">
                        <Calendar className="w-6"></Calendar>
                        <div className="relative">
                            <div className="bg-[#0C7E48] rounded-full text-white text-xs absolute px-1 bottom-2">4</div>
                        </div>
                    </button>
                </div>
            </div>
            <div className="w-11/12 h-60 bg-[#102F5E] flex items-center rounded-xl mt-7">
                <div className="w-full">
                    <h4 className="text-white text-xs mt-3 ml-4">ITEM STATUS</h4>
                        <div className="w-full h-[90px]">
                            <div className="w-full h-1/2 flex justify-between items-center">
                                <button className="w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-400 border border-black hover:scale-105 transform-all ease-out duration-300">
                                    <p className="text-[10px] text-black ml-3">All</p>
                                    <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-3 px-2">123</div>
                                </button>
                                <button className="w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                                    <p className="text-[10px] text-black ml-3">Borrowed</p>
                                    <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-3 px-2">13</div>
                                </button>
                            </div>
                            <div className="w-full h-1/2 flex justify-between items-center">
                            <button className="w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                                <p className="text-[10px] text-black ml-3">Returned</p>
                                <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-3 px-2">19</div>
                            </button>
                            <button className="w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                                <p className="text-[10px] text-black ml-3">Requests</p>
                                <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-3 px-2">23</div>
                            </button>
                        </div>
                    </div>
                    <h4 className="text-white text-xs mt-1 ml-4">SORT BY</h4>
                    <div className="w-full h-[90px]">
                        <div className="w-full h-1/2 flex justify-between items-center">
                            <button className="w-[43%] h-7 rounded-md bg-[#E9E9E9] ml-4 flex justify-between items-center hover:scale-105 transform-all ease-out duration-300">
                                <p className="text-[10px] text-black ml-3">Name</p>
                                <p className="text-[8px] text-black mr-3">(A - Z)</p>
                            </button>
                            <button className="w-[43%] h-7 rounded-md flex justify-between mr-4 items-center bg-[#E9E9E9]  transform-all ease-out duration-300 hover:scale-105">
                                <p className="text-[10px] text-black ml-3">Date</p>
                                <p className="text-[8px] text-black mr-3">(Newest)</p>
                            </button>
                        </div>
                    <div className="w-full h-1/2 flex justify-start items-center pb-2">
                        <button className="w-[43%] h-7 rounded-md flex justify-between ml-4 items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                            <p className="text-[10px] text-black ml-3">Date</p>
                            <p className="text-[8px] text-black mr-3">(Oldest)</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SideBar;