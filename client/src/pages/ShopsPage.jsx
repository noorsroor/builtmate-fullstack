import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
// import { Sidebar } from "lucide-react";
import Sidebar from "../components/admin/Sidebar";

// Sample data
const users = [
  { id: 1, name: "Ali", email: "ali@example.com", age: 25 },
  { id: 2, name: "Sarah", email: "sarah@example.com", age: 32 },
  { id: 3, name: "John", email: "john@example.com", age: 29 },
];

// Define columns
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: info => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: info => info.getValue(),
  }),
];

const ShopsPage = () => {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    // <div className="p-4">
    //   <h2 className="text-xl font-semibold mb-4">Users Table</h2>
    //   <div className="overflow-x-auto rounded-lg shadow-md">
    //     <table className="min-w-full divide-y divide-gray-200 bg-white">
    //       <thead className="bg-gray-100">
    //         {table.getHeaderGroups().map(headerGroup => (
    //           <tr key={headerGroup.id}>
    //             {headerGroup.headers.map(header => (
    //               <th
    //                 key={header.id}
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"
    //               >
    //                 {flexRender(
    //                   header.column.columnDef.header,
    //                   header.getContext()
    //                 )}
    //               </th>
    //             ))}
    //           </tr>
    //         ))}
    //       </thead>
    //       <tbody className="divide-y divide-gray-100">
    //         {table.getRowModel().rows.map(row => (
    //           <tr key={row.id}>
    //             {row.getVisibleCells().map(cell => (
    //               <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
    //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //               </td>
    //             ))}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <Sidebar/>
  );
};

export default ShopsPage;
