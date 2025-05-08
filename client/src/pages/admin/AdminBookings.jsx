import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import Modal from "../../components/Modal";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortByDate, setSortByDate] = useState("desc");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get(`http://localhost:5000/api/admin/bookings?search=${search}&status=${statusFilter}&sort=${sortByDate}`);
      setBookings(res.data.bookings);
    };
    fetchBookings();
  }, [search, statusFilter, sortByDate]);

  const columns = useMemo(() => [
    {
      header: "User Name",
      accessorKey: "user",
      cell: ({ row }) => `${row.original.user?.firstname || ""} ${row.original.user?.lastname || ""}`,
    },
    {
      header: "Pro Name",
      accessorKey: "professional",
      cell: ({ row }) => `${row.original.professional?.userId?.firstname || ""} ${row.original.professional?.userId?.lastname || ""}`,
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Booking Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => moment(getValue()).format("YYYY-MM-DD"),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
        onClick={() => setSelectedBooking(row.original)}
          class="cursor-pointer shadow-sm text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#E7A624] transition-all ease-in duration-200"
        >
          View Details ⨠
        </button>
      ),
    },
  ], []);

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: search,
    },
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row  mb-4 gap-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by user or pro"
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="quoted">Quoted</option>
          <option value="paid">Paid</option>
          <option value="completed">Completed</option>
        </select>
        <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)} className="border p-2 rounded">
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-2 text-left border-b">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal onClose={() => setSelectedBooking(null)}>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Booking Details</h2>
            <p><strong>User:</strong> {selectedBooking.user?.firstname} {selectedBooking.user?.lastname}</p>
            <p><strong>Professional:</strong> {selectedBooking.professional?.userId?.firstname} {selectedBooking.professional?.userId?.lastname}</p>
            <p><strong>Type:</strong> {selectedBooking.type}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <p><strong>Created At:</strong> {moment(selectedBooking.createdAt).format("YYYY-MM-DD HH:mm")}</p>
            <p><strong>Form Data:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(selectedBooking.formData, null, 2)}</pre>
            {selectedBooking.isPaid && (
              <>
                <p><strong>Payment:</strong></p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Amount Paid: ${selectedBooking.payment?.amountPaid}</li>
                  <li>Commission: ${selectedBooking.payment?.adminCommission}</li>
                  <li>Payment Method: {selectedBooking.payment?.method}</li>
                  <li>Transaction ID: {selectedBooking.payment?.transactionId}</li>
                  <li>Payment Date: {moment(selectedBooking.payment?.paymentDate).format("YYYY-MM-DD")}</li>
                </ul>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminBookings;
