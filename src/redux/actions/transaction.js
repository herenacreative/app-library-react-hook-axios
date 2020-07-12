import axios from "axios";

export const postBorrow = (formData, token) => {
  return {
    type: "POST_BORROW",
    payload: axios({
      method: "POST",
      url: "http://localhost:8080/v1/borrow",
      data: formData,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const getPendingBorrow = (book_id, user_id, token) => {
  return {
    type: "GET_PENDING_BORROW",
    payload: axios({
      method: "POST",
      url: `http://localhost:8080/v1/borrow/${book_id}/${user_id}`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const postReturn = (formData, token) => {
  return {
    type: "POST_RETURN",
    payload: axios({
      method: "POST",
      url: "http://localhost:8080/v1/return",
      data: formData,
      headers: {
        Authorization: token,
      },
    }),
  };
};
