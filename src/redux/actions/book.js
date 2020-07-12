import axios from 'axios'

export const getBook = (token, params = "") =>{
    const getID = params ? `/${params}` : '';
    return{
        type: "GET_BOOK",
        payload: axios({
            method: 'GET',
            url: `http://localhost:8080/v1/books${getID}`,
            headers: {
              Authorization: token
            }
        })
    }
}

export const getBookId = (token, id) =>{
    return{
        type: "GET_BOOK_ID",
        payload: axios({
            method: 'GET',
            url: 'http://localhost:8080/v1/books/' + id,
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

export const putBook = (formData, token, id) =>{
    return{
        type: "PUT_BOOK",
        payload: axios({
            method: 'PUT',
            url:'http://localhost:8080/v1/books/' + id,
            data: formData,
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const deleteBook = (token, id) =>{
    return{
        type: "DELETE_BOOK",
        payload: axios({
            method: 'DELETE',
            url: 'http://localhost:8080/v1/books/' + id,
            headers: {
              Authorization: token
            }
        })
    }
}