import axios from 'axios'
export const UserLogin = (email, password) => async (Dispatch) => {
    try {
        Dispatch({
            type: " Usercall"
        })
        let Url = `http://localhost:4000/api/v1/login`
        const { data } = await axios.post(Url, { email, password })
        const { token } = data
        window.localStorage.setItem("token", token)
        Dispatch({
            type: "UserSucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "UserFailure",
            payload: error.message,
        })
    }

}