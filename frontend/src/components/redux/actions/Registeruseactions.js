import axios from 'axios'
export const register = (Userdata) => async (Dispatch) => {
    try {
        Dispatch({
            type: " Usercall"
        })
        let Url = `http://localhost:4000/api/v1/register`
        const { data } = await axios.post(Url,Userdata)
        const {token}=data
        window.localStorage.setItem("token",token)
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
export default register