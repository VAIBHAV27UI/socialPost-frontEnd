import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/action/postAction";
import API from "../utils/axios";
import NavbarAdmin from "./NavbarAdmin";

const Owner = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const allPost =
    posts?.data?.map((post) => ({
      ...post,
      createdByName: post.createdBy?.name || "Unknown",
    })) || [];

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/get-all-post/${id}/status`, { status: newStatus });
      dispatch(getAllPosts());
    } catch (error) {
      console.error("Failed to update status:", err.message);
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "information",
      headerName: "Information",
      width: 200,
      editable: true,
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        if (!params.row.image) return null;
        return (
          <div className="flex items-center">
            <div className="w-15 h-15 mt-1"> 
              <img src={params.row.image} alt={params.row.title} className="w-full rounded-full" />
            </div>
          </div>
        );
      },
    },
    {
      field: "createdByName",
      headerName: "Created By",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) =>
        params.row.status === "pending" ? (
          <select
            value={params.row.status}
            className="px-2 py-1.5 mt-1 text-gray-500 border border-gray-500 rounded-md outline-none"
            onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        ) : (
          <span
            className={`px-3 py-1 rounded-full text-xs font-demibold ${
              params.row.status === "approved"
                ? "bg-green-100 text-green-500"
                : "bg-red-100 text-red-500"
            }`}
          >
            {params.row.status}
          </span>
        ),
    },
  ];

  return (
    <>

    <div>
        <NavbarAdmin/>
    </div>
      <div className="max-w-4xl mx-auto mt-10">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={allPost}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};

export default Owner;
