import axios from 'axios'
export const ProductAction = (keyword = "", currentPage = 1, Price = [0, 50000], category, ratings = 0) => async (Dispatch) => {
    try {
        Dispatch({
            type: "Allproduct",
        })
        let Link = `http://localhost:4000/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${Price[0]}&price[lte]=${Price[1]}&ratings[gte]=${ratings}`
        if (category) {
            Link = `http://localhost:4000/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${Price[0]}&price[lte]=${Price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const { data } = await axios.get(`${Link}`)
        Dispatch({
            type: "AllproductSucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "AllproductFail",
            payload: error.response.data.message
        })

    }
}
//admin action
export const AllProductAdmin = () => async (Dispatch) => {
    try {
        Dispatch({
            type: "adminAllproduct"
        })
        let url = `http://localhost:4000/api/v1/admin/allproduct`
        const { data } = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token')
            }
        })


        Dispatch({
            type: "adminAllproductSucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "adminAllproductFail",
            payload: error,
        })
    }
}
export const DeleteProduct = (id) => async () => {
    try {
        let url = `http://localhost:4000/api/v1/product/${id}`
        const { data } = await axios.delete(url, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        alert(`${data.message}`)
    } catch (error) {
        alert(
            `${error.message}`
        )
    }
}
//new product admin action

export const adminNewProduct = (productdata) => async (Dispatch) => {
    try {
        Dispatch({
            type: "NewProductcall",
        })
        let url=`http://localhost:4000/api/v1/product/new`
        const { data } = await axios.post(url, productdata, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        Dispatch({
            type: "NewProductsucsses",
            payload: data,
        })

    } catch (error) {
        Dispatch({
            type: "NewProductfail",
            payload: error,
        })
    }

}
export const Resetnewproduct = () => async (Dispatch) => {
    Dispatch({
        type: "NewProductreset"
    })
}