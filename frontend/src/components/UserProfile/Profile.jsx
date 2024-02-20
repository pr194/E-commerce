import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import './Profile.css'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import Metadata from '../layout/Metadata'
const Profile = () => {
    const { user, Loading } = useSelector((state) => state.userReducer)
    return (
        <Fragment>
            {Loading && !user ? <Loader /> : <Fragment>{user && <Fragment>
                <Metadata title={`${user.name}'s Profile`} />
                <div className='profileContainer'>
                    <div>
                        <h1>My Profile</h1>
                        <img src={user.avatar.url} alt='user avatar' />
                        <Link to='/me/update'>Update</Link>
                    </div>
                    <div>
                        <div>
                            <h4>Full name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            <p>{String(user.createdAT).substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to='/orders' >My Orders</Link>
                            <Link to='/password/update'>Update Password</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
            }
            </Fragment>}
        </Fragment>
    )
}

export default Profile