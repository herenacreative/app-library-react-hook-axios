import axios from 'axios'

export const getGenre = token =>{
    return{
        type: "GET_GENRE",
        payload: axios({
            method: 'GET',
            url: 'http://54.85.133.10/library/v1/genres?page=1&limit=100',
            headers: {
              Authorization: token
            }
        })
    }
}