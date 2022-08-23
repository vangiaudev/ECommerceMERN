import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "redux/Constants/CartConstants";

const cartReducer = (state = {cartItems: []}, action)  =>{
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
                
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
                
            }
        case CART_REMOVE_ITEM:
            const test =  {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload.product)
            }
            console.log(action.payload.product);
            return test;

    
        default:
            return state;
    }
}

export {cartReducer}