const initialState ={
    isLoading : false,
    isError : false,
    errorMsg : "",
    data : []
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "GET_USER_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: "Data rejected"
            };
        case "GET_USER_FULFILLED":
            // console.log(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data.results
            };

        case "GET_USER_ID_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "GET_USET_ID_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: "Data rejected"
            };
        case "GET_USER_ID_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data.results
            };
        default:
            return state;
    }
}

export default user