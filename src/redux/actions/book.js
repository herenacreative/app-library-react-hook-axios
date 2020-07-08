import axios from 'axios'

export const getBook = token =>{
    return{
        type: "GET_BOOK",
        payload: axios({
            method: 'GET',
            url: 'http://localhost:8080/v1/books?page=1&limit=100',
            headers: {
              Authorization: token
            }
        })
    }
}

export const postBook = (formData, token) =>{
    return{
        type: "POST_BOOK",
        payload: axios({
            method: 'POST',
            url:'http://localhost:8080/v1/books',
            data: formData,
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}