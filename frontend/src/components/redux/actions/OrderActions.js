import axios from "axios"
export const createOrder = (order) => async (Dispath) => {

    try {
        Dispath({
            type: "createOrderCall"
        })
        let url = `http://localhost:4000/api/v1/order/new`
        const { data } = await axios.post(url, order, {
            headers: {
                "token": localStorage.getItem('token'),
            },
        })

        Dispath({
            type: "createNeworder",
            payload: data.order
        })

    } catch (error) {
        Dispath({
            type: "createOrderFail",
            payload: error.message
        })

    }

}
export const UserOrderaction = () => async (Dispath) => {
    try {
        Dispath({
            type: "createMyOrderCall"
        })
        let url = `http://localhost:4000/api/v1/orders/me`
        const { data } = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        Dispath({
            type: "createMyNeworder",
            payload: data.orders
        })
    } catch (error) {
        Dispath({
            type: "createMyOrderFail",
            payload: error.message
        })

    }

}
export const Singleorder = (id) => async (Dispatch) => {
    try {
        Dispatch({
            type: " singleOrderCall"
        })
        const url = `http://localhost:4000/api/v1/order/${id}`
        const { data } = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        Dispatch({
            type: "singleOrderSucsses",
            payload: data.order

        })
    } catch (error) {
        Dispatch({
            type: "singleOrderFail",
        })
    }
}
// admin actions
export const GetallOrders = () => async (Dispatch) => {
    try {
        Dispatch({
            type: "Getallordercall"
        })
        let url = `http://localhost:4000/api/v1/orders/all`
        const { data } = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        Dispatch({
            type: "GetallorderSucsses",
            payload: data
        })

    } catch (error) {
        Dispatch({
            type: "GetallorderFail",
            payload: error
        })

    }

}
// admin actions
export const AdminupdateOrder = (id, updatedata) => async (Dispatch) => {
    try {
        Dispatch({
            type: "Aocall"
        })
        let url = `http://localhost:4000/api/v1/admin/update/:${id}`
        const { data } = await axios.put(url, updatedata, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        Dispatch({
            type: "Aosucsses",
            payload: data
        })
    } catch (error) {
        Dispatch({
            type: "Aofail"
        })
    }
}
//admin delete
export const AdminDelete = (id) => async () => {
    try {
        let url = `http://localhost:4000/api/v1/orders/delete/${id}`
        const { data } = await axios.delete(url, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        alert(`${data.sucsses}`)
    } catch (error) {
        alert(`${error}`)
    }
}