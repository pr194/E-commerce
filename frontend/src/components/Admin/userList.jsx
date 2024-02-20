import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productlist.css";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/Metadata";
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { Admindeleteuser, adminGetalluser } from "../redux/actions/Profile";


const UsersList = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.adminAlluser)
    const {sucsses}=useSelector((state)=>state.deleteuser)
    const navigate=useNavigate()
    const deleteUserHandler = (id) => {
       dispatch(Admindeleteuser(id))
    };

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });
    useEffect(() => {
        if(sucsses){
          navigate('/admin/users')
        }
      dispatch(adminGetalluser())
    }, [dispatch,navigate,sucsses])


    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default UsersList;