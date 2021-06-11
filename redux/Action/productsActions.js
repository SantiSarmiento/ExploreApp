import axios from "axios"

const productsActions ={
    
    fetchAllProducts:()=>{
        return(dispatch)=>{
            axios.get("https://explore-2021.herokuapp.com/api/products")
            .then( data => dispatch({ type:"FETCHALLPRODUCTS", payload: data.data.result }) )
            .catch( err => console.log( err ) )
        }
    },
    sendMail: (form, creditCard, cart) => {
        return () => {
            return axios.post("https://explore-2021.herokuapp.com/api/mails/sendSumary", { form, creditCard, cart })
                .then(data => data.data)
                .catch(err => toast.error('Something went wrong, try again later!', {
                    position: "top-right",
                    autoClose: 1700,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
        }
    },
    searchAction:(search)=>{
        return (dispatch)=>{
            dispatch({ type:"SEARCH", payload:search })
        }
    }
}

export default productsActions
