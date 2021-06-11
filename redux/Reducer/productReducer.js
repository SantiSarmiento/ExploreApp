
const initialState = {
    allProducts:[],
    filtered:[]
}

const productsReducer =( state = initialState, action )=>{

    switch (action.type) {
        case "FETCHALLPRODUCTS" :
            return{
                ...state,
                allProducts: action.payload,
                filtered:action.payload
            }

        case "SEARCH":
            return{
                ...state,
                filtered: state.allProducts.filter(article => article.name.toLocaleLowerCase().trim().includes( action.payload.toLocaleLowerCase().trim()))
            }
    
        default: return state
        
    }
}

export default productsReducer