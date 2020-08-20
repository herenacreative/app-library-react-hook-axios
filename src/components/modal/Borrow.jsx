import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Input from "../inputs/Input";
import Buttons from "../inputs/Buttons";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import { connect } from "react-redux";
import { putBook, getBook, getBookId } from "../../redux/actions/book";
import { getAuthor } from "../../redux/actions/author";
import { getGenre } from "../../redux/actions/genre";
import { login } from "../../redux/actions/auth";
import transaction from "../../redux/reducers/transaction";
import {
  postBorrow,
  postReturn,
  getPendingBorrow,
} from "../../redux/actions/transaction";
import book from "../../redux/reducers/book";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AddBorrow = (props) => {
  const [open, setOpen] = React.useState(false);
  const [borrow, setBorrow] = useState({});

  useEffect(() => {
    const token = props.auth.data.token;
    const user_id = props.auth.data.user_id;
    const book_id = props.match.params.book_id;
    props.getPendingBorrow(book_id, user_id, token);
  }, []);

  useEffect(() => {
    setBorrow(props.transaction.data);
    console.log("====================================");
    console.log(props.transaction);
    console.log("====================================");
  }, [props]);

  useEffect(() => {
    console.log(borrow, "borrow update");
  }, [borrow]);

  //   const handleClickOpen = () => {
  //     setBorrow({
  //       ...borrows,
  //       book_name: props.bookBorrow.book_name,
  //       user_id: props.bookBorrow.user_id,
  //     });
  //     setOpen(true);
  //   };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  // useEffect(() => {
  //   const token = props.auth.data.token;
  //   const id = props.auth.data.user_id;
  //   // alert(props.auth.data.user_id);
  //   // props.login(token);
  // }, []);
  const borrowBook = () => {
    const token = props.auth.data.token;
    const user_id = props.auth.data.user_id;
    const book_id = props.match.params.book_id;
    const data = {
      user_id: user_id,
      book_id: book_id,
    };
    props
      .postBorrow(data, token)
      .then((res) => {
        console.log(res, "ini result");
        alert("Sukses");
      })
      .catch((err) => {
        console.log(err, "ini error");
        alert("Error !");
      });
  };

  const returnBook = () => {
    const token = props.auth.data.token;
    const user_id = props.auth.data.user_id;
    const book_id = props.match.params.book_id;
    const data = {
      user_id: user_id,
      book_id: book_id,
    };
    props
      .postReturn(data, token)
      .then((res) => {
        console.log(res, "ini result");
        alert("Sukses");
      })
      .catch((err) => {
        console.log(err, "ini error");
        alert("Error !");
      });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   const formData = new FormData();
  //   // formData.append("book_name", setBorrow.book_name);
  //   // formData.append("user_id", setBorrow.user_id);

  //   axios({
  //     method: "POST",
  //     url: "http://54.85.133.10/library/v1/borrow",
  //     data: formData,
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //       localStorage.setItem("token", response.data.data[0].token);
  //       localStorage.setItem(
  //         "refreshToken",
  //         response.data.data[0].refreshToken
  //       );
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       console.log(error.response);
  //     });
  // };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => borrowBook()}>
        Borrow
      </Button>
      <Button variant="outlined" color="primary" onClick={() => returnBook()}>
        Return
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  putBook,
  getBook,
  postBorrow,
  postReturn,
  getPendingBorrow,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBorrow);
