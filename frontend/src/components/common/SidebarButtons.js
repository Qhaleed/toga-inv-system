const SidebarButtons = ({
    handleSortNameAsc, 
    handleSortNameDesc, 
    handleSortDateNewest,
    handleSortDateOldest,
    activeTab
    }) => {
    return ( 
        <div className=" min-w-full md:w-11/12  md:scale-100 scale-90 sm:min-w-24 md:min-w-48 md:h-60 bg-[#102F5E] flex items-center rounded-xl md:mt-7 border">
            <div className="relative w-full flex flex-col justify-between md:w-full">
              <h4 className="text-white text-[13px] md:text-[13px] mt-1 ml-4 md:scale-100">
                ITEM STATUS
              </h4>
              {activeTab === "evaluation" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button className="relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-300 hover:scale-105 transform-all ease-out duration-300">
                      <p className="sm:text-[14px] text-[12px] md:text-[15px] font-figtree font-bold text-black ml-3">
                        All
                      </p>
                      <div className="right-0 absolute sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        123
                      </div>
                    </button>
                    <button className="relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-100 hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300">
                      <p className="sm:text-[14px] text-[13px] md:text-[15px] font-figtree font-bold text-black ml-3">
                        Evaluated
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        13
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button className="relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-300 hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105">
                      <p className="sm:text-[14px] text-[13px] font-bold text-black ml-3">
                        No Evaluation
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] md:sm:text-[14px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        19
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button className="relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-300 hover:scale-105 transform-all ease-out duration-300">
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[10px] md:text-[13px] font-figtree font-bold text-black ml-3">
                        All
                      </p>
                      <div className="right-0 absolute 2xl:text-[15px] sm:text-[10px] md:text-[12px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        123
                      </div>
                    </button>
                    <button className="relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-100 hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300">
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[13px] font-figtree font-bold text-black ml-3">
                        Borrowed
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] md:text-[12px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        13
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button className="relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-300 hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105">
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[12px] font-bold text-black ml-3">
                        Returned
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        19
                      </div>
                    </button>
                    <button className="relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-100 hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105">
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[13px] font-figtree font-bold text-black ml-3">
                        Requests
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        23
                      </div>
                    </button>
                  </div>
                </div>
              )}
              <h4 className="text-white text-xs mt-1 ml-4 md:scale-100">
                SORT BY
              </h4>
              <div className={`w-full h-[90px] md:scale-100`}>
                <div className="w-full h-1/2 flex justify-between items-center">
                  <button
                    onClick={handleSortNameAsc}
                    className={`w-[43%] h-7 rounded-md bg-[#E9E9E9] ml-4 flex justify-between items-center hover:scale-105 transform-all ease-out duration-300`}
                  >
                    <p className="text-[8px] sm:text-[10px] 2xl:text-[15px] md:text-[12px] t font-figtree font-bold text-black ml-3">
                      Name
                    </p>
                    <p className="sm:text-[10px] md:text-[12px] 2xl:text-[15px] text-[13px] text-black mr-3">
                      (A - Z)
                    </p>
                  </button>
                  <button
                    onClick={handleSortNameDesc}
                    className={`w-[43%] h-7 rounded-md flex justify-between mr-4 items-center bg-[#E9E9E9]  transform-all ease-out duration-300 hover:scale-105`}
                  >
                    <p className="text-[13px] md:text-[15px] 2xl:text-[15px]s font-figtree font-bold text-black ml-3">
                      Name
                    </p>
                    <p className="sm:text-[10px] md:text-[12px] 2xl:text-[15px] text-black mr-3">
                      (Z - A)
                    </p>
                  </button>
                </div>
                <div className="w-full h-1/2 flex justify-between items-center">
                  <button
                    onClick={handleSortDateNewest}
                    className={`w-[43%] h-7 rounded-md flex justify-between ml-4 items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105`}
                  >
                    <p className="sm:text-[10px] md:text-[12px] 2xl:text-[15px] font-figtree font-bold text-black ml-3">
                      Date
                    </p>
                    <p className="sm:text-[10px] md:text-[12px] 2xl:text-[15px] text-black mr-3">
                      (Newest)
                    </p>
                  </button>
                  <button
                    onClick={handleSortDateOldest}
                    className={`w-[43%] h-7 rounded-md flex justify-between mr-4 items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105`}
                  >
                    <p className="sm:text-[10px] md:text-[12px]  2xl:text-[15px] font-figtree font-bold text-black ml-3">
                      Date
                    </p>
                    <p className="sm:text-[10px] md:text-[12px] 2xl:text-[15px] text-black mr-3">
                      (Oldest)
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
     );
}
 
export default SidebarButtons;