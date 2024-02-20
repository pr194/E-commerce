import axios from 'axios'
export const SingleProductAction = (id) => async (Dispatch) => {
  
    try {
        Dispatch({
            type: "Productcall",
        })
        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`)

        Dispatch({
            type: "ProductSucsses",
            payload: data.Product,
        })

    } catch (error) {
        Dispatch({
            type: "ProductFail",
            payload: error.response.data.message
        })

    }
}
export default SingleProductAction