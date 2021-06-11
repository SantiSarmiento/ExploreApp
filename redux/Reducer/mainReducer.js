import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import userReducer from './userReducer'
import productsReducer from './productReducer'

const mainReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    productsReducer
})

export default mainReducer