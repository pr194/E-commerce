import React, { Fragment } from 'react'
import './Myorder.css'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import Metadata from '../layout/Metadata'
import Loader from '../layout/Loader/Loader'
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material';
const Myorders = () => {

  const { user, Loading } = useSelector(state => state.userReducer)
  const { orders } = useSelector(state => state.Userorder)

  const rows = []
  orders && orders.map((item) => {
    return (
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      })
    )
  })
  const cols = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ]
  return (
    <Fragment>
      <Metadata title={`${user.name}'- orders`} />
      {Loading ? <Loader /> : <Fragment>
        <div className='myOrdersPage'>
          <DataGrid rows={rows} columns={cols} pageSize={10} disableSelectionOnClick className='myOrderTable' autoHeight />
          <Typography id="myOrdersHeading">
            {user.name}'s orders
          </Typography>
        </div>
      </Fragment>}

    </Fragment>
  )
}

export default Myorders