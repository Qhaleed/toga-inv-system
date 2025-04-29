import Rows from "./Rows";
import "./Table.css";

const Table = () => {
    return(
    <div className="h-[590px] mt-4 w-full flex justify-center">  {/*Table Container for Positioning*/}
        <div class="h-full w-[96%] overflow-auto scroll-style"> 
            <table className="table-auto w-full border border-gray-400 "> {/*Dashboard Table*/}
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