import { combineReducers } from 'redux';
import { productCreateReducer, productListReducer } from './productReducers';
import { loginUser, registerUser } from './userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    newProduct: productCreateReducer,
    userLogger: loginUser || registerUser,
})

export default reducer;