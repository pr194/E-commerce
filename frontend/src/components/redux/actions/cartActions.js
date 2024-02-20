import axios from 'axios'
export const AddcartItem = (id, quantity) => async (Dispatch, getState) => {

    try {
        let Url = `http://localhost:4000/api/v1/product/${id}`
        const { data } = await axios.get(Url)
        const item = {
            product: data.Product._id,
            name: data.Product.name,
            price: data.Product.price,
            image: data.Product.images[0].url,
            stock: data.Product.Stock,
            quantity,
        }
        Dispatch({
            type: "AddTocart",
            payload: item
        })
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))

    } catch (error) {
        alert(`${error}`)
    }

}
export const Removefromcart = (id) => async (Dispatch, getState) => {
    try {
        Dispatch({
            type: "RemovecartItem",
            payload: id,
        })
        localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        alert('something wrong')
    }

}
export const saveShippingInfo = (data) => async (dispatch) => {
   
    dispatch({
        type: "ShippingInfo",
        payload: data
    });

    localStorage.setItem("shippingInfo", JSON.stringify());
}


