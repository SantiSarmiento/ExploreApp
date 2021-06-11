import axios from "axios";
import * as FileSystem from "expo-file-system"

const userActions = {

    createAcountWithPhoto: (form, img) => {
        return async (dispatch, getState) => {
            try {
                let response = await FileSystem.uploadAsync("https://explore-2021.herokuapp.com/api/user/signup", img, {
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: "photo",
                    parameters: form
                })
                response = JSON.parse(response.body)

                if (!response.success) { return response.response.error }
                dispatch({ type: 'SIGNIN_USER', payload: response.response })
                return true

            } catch (error) {
                console.log(error)
            }
        }
    },
    createAcount: (infoUser) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post("https://explore-2021.herokuapp.com/api/user/signup", infoUser)
                if (response) {
                    if (!response.data.success) {
                        return response.data
                    } else {
                        dispatch({ type: 'SIGNIN_USER', payload: response.data.response })
                        return true
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    signInUser: (infoUser) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post("https://explore-2021.herokuapp.com/api/user/signin", infoUser)
                if (!response.data.success) {
                    return response.data.error
                }
                dispatch({ type: 'SIGNIN_USER', payload: response.data.response })
                return true
            } catch (error) {
                console.log(error)
            }
        }

    },

    SignOut: () => {
        return (dispatch, getState) => {

            dispatch({ type: 'LOGOUT' })
            /*  toast.success("👋Bye", {
                 autoClose: 1000,
                 position: "top-center",
             }) */
        }
    },

    relogin: (userToken) => {

        return async (dispatch, getState) => {
            const response = await axios.get("https://explore-2021.herokuapp.com/api/user/relogin", { headers: { 'Authorization': 'Bearer ' + userToken.token } })

            dispatch({
                type: 'SIGNIN_USER', payload: {
                    ...response.data.response,
                    token: userToken.token
                }
            })
        }
    },

    uploadPhoto: (formData) => {
        return async (dispatch, getState) => {
            await axios.post("https://explore-2021.herokuapp.com/api/user/uploadPhoto", formData)
        }
    },

}

export default userActions