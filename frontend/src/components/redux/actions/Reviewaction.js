import axios from "axios";

export const reviewCreate = (Reviewdata) => async (Dispatch) => {
    try {
        Dispatch({
            type: "Reviewcall",
        })
        const url = `http://localhost:4000/api/v1/review`
        const { data } = await axios.put(url, Reviewdata, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        Dispatch({
            type: "ReviewSucsses",
            payload: data.sucsses,
        })
    } catch (error) {
        Dispatch({
            type: "ReviewFail",
            payload: error
        })

    }
}
export const Resetrev = () => async (Dispatch) => {
    Dispatch({
        type: "Reviewreset"
    })

}