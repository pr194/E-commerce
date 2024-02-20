import React, { Fragment, useState, useEffect } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Loader from '../layout/Loader/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../redux/actions/userActions';
import register from '../redux/actions/Registeruseactions';
import { useNavigate } from 'react-router-dom';
import Metadata from "../layout/Metadata";
import './loginsig.css'
const Loginsignup = () => {
    const Dispatch = useDispatch()
    const navigate = useNavigate()
    const [Login, setLogin] = useState(false)
    const [user, setUserlogin] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [lemail, setlemail] = useState("")
    const [lpassword, setlpassswprd] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg");
    const [Aurl, setAurl] = useState('https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg')
    const Loginuser = (e) => {
        e.preventDefault()
        Dispatch(UserLogin(lemail, lpassword))
        setlemail("")
        setlpassswprd("");

    }
    const RegisterUser = (event) => {
        event.preventDefault();
        setUserlogin({ name: "", email: "", password: "" })
        const myForm = new FormData();
        myForm.set("name", user.name)
        myForm.set("email", user.email)
        myForm.set("password", user.password)
        myForm.set("avatar", Aurl)
        Dispatch(register(myForm))
        setAurl('https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg')

    }
    const { Loading, IsAuthenticated } = useSelector((state) => state.userReducer)
    useEffect(() => {
        if (IsAuthenticated) {
            navigate('/account')
        }
       
    }, [Dispatch, navigate, IsAuthenticated])


    const setUser = (event) => {
        const { name } = event.target
        if (name === 'login') {
            setLogin(true)
        }
        else {
            setLogin(false)
        }

    }

    const Rinputchange = (e) => {
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
            setUserlogin({ ...user, [e.target.name]: e.target.value });
        }

    }
    return (
        <Fragment>
            {Loading ? <Loader /> : <Fragment>
                <Metadata title={'login-register'} />
                <div className='loginSignup'>
                    <div className='Loginsignup'>
                        <div className='toggle'>
                            <button onClick={setUser} name='login'>Login</button>
                            <button onClick={setUser} name='register'>Register</button>
                        </div>
                        {Login ? (<form onSubmit={Loginuser}><div className='LoginForm'>

                            <div className='LoginEmail'>
                                <MailOutlineIcon />
                                <input type="email" required placeholder='Email' name="lemail" value={lemail} onChange={(e) => setlemail(e.target.value)} />
                            </div>
                            <div className='LoginEmail'>
                                <LockOpenIcon />
                                <input type="password" required placeholder='Password' name='lpassword' value={lpassword} onChange={(e) => setlpassswprd(e.target.value)} />
                            </div>
                            <div className='forget-password'>
                                <a href='http://localhost:4000/'>forget Password?</a>
                            </div>
                            <div className='lgbutton'>
                                <button type='submit'>Login</button>
                            </div>

                        </div></form>) : <form onSubmit={RegisterUser}>
                            <div className='Registerform'>
                                <div className='RegisterEmail'>
                                    <FaceIcon />
                                    <input type="Name" required placeholder='Name' name='name' value={user.name} onChange={Rinputchange} />
                                </div>
                                <div className='RegisterEmail'>
                                    <MailOutlineIcon />
                                    <input type="email" required placeholder='Email' name='email' value={user.email} onChange={Rinputchange} />
                                </div>
                                <div className='RegisterEmail'>
                                    <LockOpenIcon />
                                    <input type="password" required placeholder='Password' name='password' value={user.password} onChange={Rinputchange} />
                                </div>
                                <div className='avatar'>
                                    <img src={avatarPreview} alt="avatar" />&nbsp;&nbsp;
                                    <input type="file" accept="image/*" onChange={Rinputchange} name='avatar' />
                                </div>
                                <div className='lgbutton'>
                                    <button type='submit'>Register</button>
                                </div>
                            </div>
                        </form>
                        }

                    </div>

                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Loginsignup