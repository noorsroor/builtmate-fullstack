import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import moment from "moment";
import Modal from "../../components/Modal"; // Your modal component
import StatusBadge from "../../components/StatusBadge"; // Optional

const AdminProfessionals = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortByDate, setSortByDate] = useState("desc");
  const [selectedPro, setSelectedPro] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/admin/professionals?search=${search}&status=${statusFilter}&sort=${sortByDate}`);
      setData(res.data.professionals);
    };
    fetchData();
  }, [search, statusFilter, sortByDate]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "userId.firstname",
        header: "Pro Name",
        cell: info => `${info.row.original.userId?.firstname || ""} ${info.row.original.userId?.lastname || ""}`,
      },
      {
        accessorKey: "professionalType",
        header: "Pro Type",
      },
      {
        accessorKey: "createdAt",
        header: "Requested At",
        cell: info => moment(info.getValue()).format("YYYY-MM-DD"),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: info => (
          <StatusBadge status={info.getValue()} />
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <button
          onClick={() => setSelectedPro(row.original)}
          class="cursor-pointer shadow-sm text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#E7A624] transition-all ease-in duration-200"
        >
          View Details ⨠
        </button>
        ),
      },
      {
        accessorKey: "updateStatus",
        header: "Update Status",
        cell: ({ row }) => {
          
          const handleChange = async (e) => {
            const newStatus = e.target.value;
            setUpdating(true);
            try {
              await axios.patch(`http://localhost:5000/api/admin/professionals/${row.original._id}/status`, {
                status: newStatus,
              });
              // Re-fetch or optimistically update
              const updatedData = data.map((pro) =>
                pro._id === row.original._id ? { ...pro, status: newStatus } : pro
              );
              setData(updatedData);
              window.location.reload();
            } catch (err) {
              console.error("Failed to update status:", err);
            } finally {
              setUpdating(false);
            }
          };
      
          return (
            <select
              value={row.original.status}
              onChange={handleChange}
              className="p-1 rounded cursor-pointer shadow-sm text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm "
              disabled={updating}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
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
      <div className="flex flex-col md:flex-row mb-4 gap-5">
        <input
          type="text"
          placeholder="Search by name or profession"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border shadow-sm p-2 rounded-md w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={sortByDate}
          onChange={(e) => setSortByDate(e.target.value)}
          className="border p-2 rounded"
        >
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
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for Pro Details */}
      {selectedPro && (
        <Modal onClose={() => setSelectedPro(null)}>
       
            <h3 className="text-xl font-bold mb-4">Professional Details</h3>
            <div className="space-y-2">
              {selectedPro.backgroundImage && (
                <img
                  src={selectedPro.backgroundImage}
                  alt="Background"
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <p><strong>Bio:</strong> {selectedPro.bio}</p>
              <p><strong>Experience:</strong> {selectedPro.experience} years</p>
              <p><strong>Location:</strong> {selectedPro.location}</p>
              <p><strong>Pro Type:</strong> {selectedPro.professionalType}</p>
          <p><strong>Status:</strong> {selectedPro.status}</p>
          
          {selectedPro.professionalType === "individual" && (
            <>
              <p><strong>Profession:</strong> {selectedPro.profession}</p>
              <p><strong>Price Per Hour:</strong> ${selectedPro.pricePerHour}</p>
            </>
          )}
          
          {selectedPro.professionalType === "organization" && (
            <>
              <p><strong>Company Services:</strong> {selectedPro.companyServices}</p>
              <p><strong>Company Registration:</strong>
                <a href={selectedPro.companyRegistration} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline"> View Document</a>
              </p>
            </>
          )}
          
          {selectedPro.professionalType === "all_in_one" && (
            <>
              <p><strong>Package Type:</strong> {selectedPro.packageType}</p>
              <p><strong>Package Price Estimate:</strong> ${selectedPro.packagePriceEstimate}</p>
              <p><strong>Services:</strong> {selectedPro.packageServices}</p>
            </>
          )}

          <p><strong>Portfolio:</strong></p>
          {selectedPro.portfolio?.map((img, idx) => (
            <a key={idx} href={img} target="_blank" rel="noopener noreferrer" className="block text-blue-600 underline">
              View Portfolio {idx + 1}
            </a>
          ))}

          <p><strong>Certifications:</strong></p>
          {selectedPro.certifications?.map((cert, idx) => (
            <a key={idx} href={cert} target="_blank" rel="noopener noreferrer" className="block text-blue-600 underline">
              View Certification {idx + 1}
            </a>
          ))}
              <p><strong>Payment Method:</strong> {selectedPro.paymentInfo?.method}</p>
              <p><strong>Payout Email:</strong> {selectedPro.paymentInfo?.payoutEmail}</p>
            </div>
 
        </Modal>
      )}
    </div>
  );
};

export default AdminProfessionals;
