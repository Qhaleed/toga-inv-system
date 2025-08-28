import React from "react";
import TasselIcon from "@/assets/icons/tassel.svg?react";

export default function TasselRepairTable({ data = [] }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-2">
        <TasselIcon className="w-7 h-7" />
        <span className="text-xl font-bold text-[#2840A1]">Tassel</span>
        <span className="ml-2 text-xs text-gray-500">
          ({data.length} for repair)
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Color
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Reason
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Student
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-4">
                  No items for repair
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td
                    className="px-4 py-3 text-gray-700 bg-purple-200 font-semibold w-[250px] truncate"
                    title={item.category}
                  >
                    {item.category}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-700 w-[150px] truncate"
                    title={item.color}
                  >
                    {item.color}
                  </td>
                  <td
                    className="px-4 py-3 bg-amber-300 text-gray-800 w-[350px] truncate"
                    title={item.reason}
                  >
                    {item.reason}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-600 w-[300px] truncate"
                    title={item.student}
                  >
                    {item.student}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-500 w-[120px] truncate"
                    title={item.date}
                  >
                    {item.date}
                  </td>
                  <td className="px-4 py-3 w-[100px]">
                    <span 
                      className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                        item.status === 'repair' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
