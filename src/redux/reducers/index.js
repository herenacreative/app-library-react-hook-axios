import { combineReducers } from "redux";
import auth from "./auth";
import book from "./book";
import author from "./author";
import genre from "./genre";
import transaction from "./transaction";

export default combineReducers({
  auth,
  book,
  author,
  genre,
  transaction,
});
