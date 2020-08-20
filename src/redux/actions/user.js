import axios from 'axios'

export const getUser = token =>{
    return{
        type: "GET_USER",
        payload: axios({
            method: 'GET',
            url: 'http://http://54.85.133.10/library/v1/user?page=1&limit=100',
            headers: {
              Authorization: token
            }
        })
    }
}

export const getUserId = (token, id) =>{
    return{
        type: "GET_USER_ID",
        payload: axios({
            method: 'GET',
            url: 'http://http://54.85.133.10/library/v1/user/' + id,
            headers: {
              Authorization: token
            }
        })
    }
}

