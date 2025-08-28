import React from "react";
import { capData } from "./damageData";
import CapIcon from "@/assets/icons/cap.svg?react";

export default function CapDamageTable({ data = capData }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-2">
        <CapIcon className="w-7 h-7" />
        <span className="text-xl font-bold text-[#2840A1]">Cap</span>
        <span className="ml-2 text-xs text-gray-500">
          ({data.length} damaged)
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
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
                <td colSpan={5} className="text-center text-gray-400 py-4">
                  No damaged items
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td
                    className="px-4 py-3 text-gray-700 font-semibold w-[200px] truncate"
                    title={item.category}
                  >
                    {item.category}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-800 w-[350px] truncate"
                    title={item.reason}
                  >
                    {item.reason}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-600 w-[250px] truncate"
                    title={item.student}
                  >
                    {item.student}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-500 w-[100px] truncate"
                    title={item.date}
                  >
                    {item.date}
                  </td>
                  <td className="px-4 py-3 w-[120px]">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Damaged
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
