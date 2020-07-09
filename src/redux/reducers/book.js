const initialState ={
    isLoading : false,
    isError : false,
    errorMsg : "",
    data : []
}

const book = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BOOK_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "GET_BOOK_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: "Data rejected"
            };
        case "GET_BOOK_FULFILLED":
            // console.log(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data.results
            };

        case "GET_BOOK_ID_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "GET_BOOK_ID_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: "Data rejected"
            };
        case "GET_BOOK_ID_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data.results
            };

        case "POST_BOOK_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "POST_BOOK_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: "Data rejected"
            };
        case "POST_BOOK_FULFILLED":
            // console.log(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isError: false
            };
            case "PUT_BOOK_PENDING":
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                };
            case "PUT_BOOK_REJECTED":
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    errorMsg: "Data rejected"
                };
            case "PUT_BOOK_FULFILLED":
                return {
                    ...state,
                    isLoading: false,
                    isError: false
                };
            case "DELETE_BOOK_PENDING":
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                };
            case "DELETE_BOOK_REJECTED":
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    errorMsg: "Data rejected"
                };
            case "DELETE_BOOK_FULFILLED":
                return {
                    ...state,
                    isLoading: false,
                    isError: false
                };
        default:
            return state;
    }
}

export default book