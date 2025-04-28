import Rows from "./rows";

const Table = () => {
    return(
    <div className="h-[590px] mt-2 w-full border border-white flex justify-center overflow-auto">  {/*Table Container for Positioning*/}
        <div class="h-full w-[96%] border border-white"> 
            <table className="table-auto border w-full border-gray-400"> {/*Dashboard Table*/}
                <thead>
                    <tr className="bg-[#02327B] text-sm text-white h-10"> {/*Table Headers*/} 
                        <th>
                            <h1 className="border-r border-gray-600">Student Name</h1>
                        </th>
                        <th>Program</th>
                        <th>Tassel</th>
                        <th>Hood</th>
                        <th>Gown</th>
                        <th>Date of Reservation</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <Rows/> {/*The data rows from the dashboard*/}
            </table>
        </div>
    </div>
    );
}

export default Table;