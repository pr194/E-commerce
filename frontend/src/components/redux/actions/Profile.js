import axios from 'axios'

export const Profile = (token) => async (Dispatch) => {

    try {
        Dispatch({
            type: " Usercall"
        })
        let Url = `http://localhost:4000/api/v1/me`
        const { data } = await axios.get(Url, {
            headers: {
                token
            }
        })
        Dispatch({
            type: "UserSucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "  UserFailure",
            payload: error.message,
        })
    }

}
export const updateProfile = (userData) => async (Dispatch) => {
    try {
        Dispatch({
            type: "Updatecall"
        })

        let Url = `http://localhost:4000/api/v1/me/update`
        const { data } = await axios.put(Url, userData,
            {
                headers: {
                    token: localStorage.getItem('token'),
                },

            })
        Dispatch({
            type: "UpadateSucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "UpdateFailure",
            payload: error.message
        })

    }

}
export const updatePassword = (userData) => async (Dispatch) => {
    try {
        Dispatch({
            type: "Updatecall"
        })

        let Url = `http://localhost:4000/api/v1/password/update`
        const { data } = await axios.put(Url, userData,
            {
                headers: {
                    token: localStorage.getItem('token'),
                },

            })
        Dispatch({
            type: "UpadateSucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "UpdateFailure",
            payload: error.message
        })

    }

}
//admin action 
export const adminGetalluser = () => async (Dispatch) => {
    try {
        Dispatch({
            type: "Ausercall"
        })

        let Url = `http://localhost:4000/api/v1/admin/users`
        const { data } = await axios.get(Url,
            {
                headers: {
                    token: localStorage.getItem('token'),
                }

            })
        Dispatch({
            type: "Ausersucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "Auserfail",
            payload: error.message
        })

    }
}
export const Admindeleteuser = (id) => async (Dispatch) => {
    try {
        Dispatch({
            type: "AdminDeletecall",
        })
        let url=`http://localhost:4000/api/v1/admin/user/${id}`
        const { data } = await axios.delete(url, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        Dispatch({
            type:"AdminDeletesucsses",
        })
        alert(`${data.message}`)

    } catch (error) {
        Dispatch({
            type:"AdminDeletefail",
        })
    }
}