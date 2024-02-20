import { Typography } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import './dashboard.css'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetallOrders } from '../redux/actions/OrderActions'
import { adminGetalluser } from '../redux/actions/Profile'
import { AllProductAdmin } from '../redux/actions/Productactions'
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut, Line } from "react-chartjs-2"
const Dashboard = () => {
  const { orders, totalamount } = useSelector((state) => state.adminAllorder)
  const { users } = useSelector(state => state.adminAlluser)
  const { productsAll:products, ProductsCount } = useSelector((state) => state.adminallProduct)
  const Dispatch = useDispatch()
  const linestate = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalamount],
      },
    ],
  }
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  useEffect(() => {
    Dispatch(GetallOrders())
    Dispatch(adminGetalluser())
    Dispatch(AllProductAdmin())
  }, [Dispatch])

  return (
    <Fragment>
      <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer'>
          <Typography component='h1'>Dashboard</Typography>
          <div className='dashboardSummary'>
            <div>
              <p>
                total amount <br /> {`₹ ${totalamount}`}
              </p>
            </div>
            <div className='dashboardSummaryBox2'>
              <Link to="/admin/products">
                <p>Product</p>
                <p>{ProductsCount && ProductsCount}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
            <div className='lineChart'>
              <Line data={linestate} />
            </div>
            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard