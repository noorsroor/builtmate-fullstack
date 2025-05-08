import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import moment from "moment";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortByDate, setSortByDate] = useState("desc");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(`http://localhost:5000/api/admin/projects?search=${search}&status=${statusFilter}&sort=${sortByDate}`);
      setProjects(res.data.projects);
    };
    fetchProjects();
  }, [search, statusFilter, sortByDate]);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/admin/projects/${id}/status`, { status });
    setProjects((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status } : p))
    );
  };

  const columns = useMemo(() => [
    {
      header: "Pro Name",
      cell: ({ row }) => {
        const user = row.original.professional?.userId;
        return `${user?.firstname || ""} ${user?.lastname || ""}`;
      },
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Publish Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => moment(getValue()).format("YYYY-MM-DD"),
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <select
          value={row.original.status}
          onChange={(e) => updateStatus(row.original._id, e.target.value)}
          className="border p-1 rounded"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
        onClick={() => setSelectedProject(row.original)}
          class="cursor-pointer shadow-sm text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#E7A624] transition-all ease-in duration-200"
        >
          View Details ⨠
        </button>
      ),
    },
  ], []);

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-5 mb-4 ">
        <input
          type="text"
          placeholder="Search by Pro or Title"
          className="border rounded p-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* Table */}
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>

      {/* Modal */}
      {selectedProject && (
        <Modal onClose={() => setSelectedProject(null)}>
          <h2 className="text-xl font-bold mb-2">{selectedProject.title}</h2>
          <p className="mb-2"><strong>Description:</strong> {selectedProject.description}</p>
          <p className="mb-2"><strong>Category:</strong> {selectedProject.category}</p>
          <p className="mb-2"><strong>Tags:</strong> {selectedProject.tags.join(", ")}</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {selectedProject.images.map((img, i) => (
              <img key={i} src={img} alt={`Project ${i}`} className="w-full h-40 object-cover rounded" />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminProjects;
