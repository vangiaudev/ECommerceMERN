import axios from "axios"

const { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } = require("redux/Constants/CartConstants")

const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data } = await axios.get(`/api/products/${id}`)
   
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }
    })

    localStorage.setItem("CART_ITEMS", JSON.stringify(getState().cart.cartItems))
}

const removeFromCart = (id) => async (dispatch, getState) => {

    const {data } = await axios.get(`/api/products/${id}`)
    console.log("DU LIEU", typeof data._id);
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            product: data._id
        }
    })
    localStorage.setItem("CART_ITEMS", JSON.stringify(getState().cart.cartItems))

}

const saveShippingAddress = (data) => async (dispatch) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem("SHIPPING_ADDRESS", JSON.stringify(data))

}

const savePaymentMethod = (data) => async (dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem("PAYMENT_METHOD", JSON.stringify(data))

}
export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod}