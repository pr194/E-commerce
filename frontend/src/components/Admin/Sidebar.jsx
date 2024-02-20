import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '@mui/icons-material/Dashboard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AddIcon from '@mui/icons-material/Add'
import logo from '../layout/header/main-logo.png'
import PeopleIcon from '@mui/icons-material/People'
import ListAltIcon from '@mui/icons-material/ListAlt';
import { TreeView, TreeItem } from '@mui/lab'
import './sidebar.css'


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to='/'>
                <img src={logo} alt="company logo" />
            </Link>
            <Link to='/admin/dashboard'>
                <p>
                    <Dashboard />
                </p>
            </Link>
            <Link>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />} >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/product/new">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>

        </div>
    )
}

export default Sidebar