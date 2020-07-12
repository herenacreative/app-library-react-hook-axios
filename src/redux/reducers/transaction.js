const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: "",
  data: [],
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case "POST_BORROW_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_BORROW_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: "Data rejected",
      };
    case "POST_BORROW_FULFILLED":
      // console.log(action.payload.data)
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case "POST_RETURN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_RETURN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: "Data rejected",
      };
    case "POST_RETURN_FULFILLED":
      // console.log(action.payload.data)
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case "GET_PENDING_BORROW_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_PENDING_BORROW_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: "Data rejected",
      };
    case "GET_PENDING_BORROW_FULFILLED":
      // console.log(action.payload.data)
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data.results,
      };

    default:
      return state;
  }
};

export default transaction;
