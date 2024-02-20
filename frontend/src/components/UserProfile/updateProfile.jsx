import React, { Fragment, useState, useEffect } from 'react'
import MailOutline from '@mui/icons-material/MailOutline'
import FaceIcon from '@mui/icons-material/Face'
import { useSelector, useDispatch } from 'react-redux'
import './updateprofile.css'
import { useNavigate } from "react-router-dom"
import { updateProfile } from '../redux/actions/Profile'
import Loader from '../layout/Loader/Loader'

const UpdateProfile = () => {
    const { user } = useSelector((state) => state.userReducer)
    const { Isupdated, Loading } = useSelector((state) => state.Updateuser)
    const Dispatch = useDispatch()
    const navigate = useNavigate()
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url)
    const [avatar, setAurl] = useState("")
    const [User, setUser] = useState({
        email: user.email,
        name: user.name,
    })
    useEffect(() => {
        if (Isupdated === true) {
            navigate('/account')
            alert('Profile updated succesfully')
        }

    }, [Dispatch, Isupdated, navigate])

    const UpdateChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAurl(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {

            setUser({ ...user, [e.target.name]: e.target.value });
        }

    }
    const UpdateProfile = (event) => {
        event.preventDefault();
        setUser({ name: "", email: "", password: "" })
        const myForm = new FormData();
        myForm.set("name", User.name)
        myForm.set("email", User.email)
        myForm.set("avatar", avatar)
        Dispatch(updateProfile(myForm))

    }
    return (
        <Fragment>{Loading ? <Loader /> : <Fragment>{user && <Fragment>
            <div className='loginSignup'>
                <div className='Loginsignup'>
                    <form onSubmit={UpdateProfile}>
                        <div className='LoginForm'>
                            <div className='RegisterEmail'>
                                <FaceIcon />
                                <input type="Name" placeholder='Name' name='name' value={User.name} onChange={UpdateChange} />
                            </div>
                            <div className='LoginEmail'>
                                <MailOutline />
                                <input type="email" required placeholder='Email' name="email" value={User.email} onChange={UpdateChange} />
                            </div>
                            <div className='avatar'>
                                <img src={avatarPreview} alt="avatar" />&nbsp;&nbsp;
                                <input type="file" accept="image/*" name='avatar' onChange={UpdateChange} />
                            </div>

                            <div className='lgbutton'>
                                <button type='submit'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>}</Fragment>}</Fragment>


    )
}

export default UpdateProfile