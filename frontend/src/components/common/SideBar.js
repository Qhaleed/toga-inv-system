import Profile from "../../assets/images/profilepicture.jpg";
import { ReactComponent as Calendar } from "../../assets/icons/black-calendar.svg";

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
  return (
    <div className="col-span-1 h-full flex flex-col justify-start items-center bg-[#001C47] w-full max-w-[90%] text-sm">
      <div className="w-full h-24 bg-[#102F5E] bg-center flex justify-between">
        <div className="flex justify-center">
          <div className="h-full ml-2 w-12 flex justify-center items-center ">
            <img className="w-12 rounded-full" src={Profile} alt="profile" />
          </div>
          <div className="h-full ml-2 flex flex-col justify-center items-start text-white">
            <h4 className="font-bold text-base">Joshua Guiritan</h4>
            <p className="text-xs font-light">Administator</p>
            <p className="text-xs font-light">UI/UX Designer</p>
          </div>
        </div>
        <div className="h-full flex justify-end items-center mr-4">
          <button className="bg-[#F3B51A] hover:bg-[#dc9f2d] hover:scale-105 h-10 w-10 rounded-full flex justify-center items-center border border-gray-700 transform-all ease-out duration-500">
            <Calendar className="w-5"></Calendar>
            <div className="relative">
              <div className="bg-[#0C7E48] rounded-full text-white text-xs absolute px-1 bottom-2">
                4
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="w-11/12 h-48 bg-[#102F5E] flex items-center rounded-xl mt-5 text-xs">
        <div className="w-full">
          <h4 className="text-white text-xs mt-2 ml-2">ITEM STATUS</h4>
          <div className="w-full h-[70px]">
            <div className="w-full h-1/2 flex justify-between items-center">
              <button className="w-[43%] h-6 rounded-md ml-2 flex justify-between items-center bg-[#E9E9E9] hover:scale-105 transform-all ease-out duration-500">
                <p className="text-[10px] text-black ml-2">All</p>
                <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-2 px-2">
                  123
                </div>
              </button>
              <button className="w-[43%] h-6 rounded-md mr-2 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-500 hover:scale-105">
                <p className="text-[10px] text-black ml-2">Borrowed</p>
                <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-2 px-2">
                  13
                </div>
              </button>
            </div>
            <div className="w-full h-1/2 flex justify-between items-center">
              <button className="w-[43%] h-6 rounded-md ml-2 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-500 hover:scale-105">
                <p className="text-[10px] text-black ml-2">Returned</p>
                <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-2 px-2">
                  19
                </div>
              </button>
              <button className="w-[43%] h-6 rounded-md mr-2 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-500 hover:scale-105">
                <p className="text-[10px] text-black ml-2">Requests</p>
                <div className="text-[10px] bg-[#0C7E48] rounded-lg text-white mr-2 px-2">
                  23
                </div>
              </button>
            </div>
          </div>
          <h4 className="text-white text-xs mt-1 ml-2">SORT BY</h4>
          <div className="w-full h-[70px]">
            <div className="w-full h-1/2 flex justify-between items-center">
              <button className="w-[43%] h-6 rounded-md bg-[#E9E9E9] ml-2 flex justify-between items-center hover:scale-105 transform-all ease-out duration-500">
                <p className="text-[10px] text-black ml-2">Name</p>
                <p className="text-[8px] text-black mr-2">(A - Z)</p>
              </button>
              <button className="w-[43%] h-6 rounded-md flex justify-between mr-2 items-center bg-[#E9E9E9]  transform-all ease-out duration-500 hover:scale-105">
                <p className="text-[10px] text-black ml-2">Date</p>
                <p className="text-[8px] text-black mr-2">(Newest)</p>
              </button>
            </div>
            <div className="w-full h-1/2 flex justify-start items-center pb-2">
              <button className="w-[43%] h-6 rounded-md flex justify-between ml-2 items-center bg-[#E9E9E9] transform-all ease-out duration-500 hover:scale-105">
                <p className="text-[10px] text-black ml-2">Date</p>
                <p className="text-[8px] text-black mr-2">(Oldest)</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
