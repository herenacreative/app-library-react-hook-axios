import axios from 'axios'

export const getAuthor = token =>{
    return{
        type: "GET_AUTHOR",
        payload: axios({
            method: 'GET',
            url: 'http://http://54.85.133.10/library/v1/authors?page=1&limit=100',
            headers: {
              Authorization: token
            }
        })
    }
}