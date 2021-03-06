import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import Input from "../inputs/Input";
import { putBook, getBook, getBookId } from "../../redux/actions/book";
import { getAuthor } from "../../redux/actions/author";
import { getGenre } from "../../redux/actions/genre";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Test from "./Test";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

////////////////////////////// DIALOG ////////////////////////////
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
////////////////////////////// DIALOG ////////////////////////////

const EditBooks = (props) => {
  const [open, setOpen] = React.useState(false);
  const {book_id, book_name,author_id, author_name,description,genre_id,genre_name,image,status,stock} = props.bookDetail;
  const [Books, setBooks] = useState({
    book_id,
    book_name,
    image,
    description,
    status,
    author_name,
    author_id,
    genre_id,
    genre_name,
    stock,
  });
  const history = useHistory();
  
  // useEffect(() => {
  //   const token = props.auth.data.token;
  //   const id = props.match.params.book_id;
  //   props.getBookId(token, id);
  // }, []);

  useEffect(() => {
    console.log(Books.image)
  }, [Books]);
  useEffect(() => {
    const token = props.auth.data.token;
    props.getAuthor(token);
  }, []);

  useEffect(() => {
    const token = props.auth.data.token;
    props.getGenre(token);
  }, []);

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const handleSubmit = () => {
    const token = props.auth.data.token;
    // const id = props.match.params.book_id;
    const formData = new FormData();
    formData.append("book_name", Books.book_name);
    formData.append("image", Books.image);
    formData.append("genre_id", Books.genre_id);
    formData.append("author_id", Books.author_id);
    formData.append("description", Books.description);
    formData.append("status", Books.status);
    formData.append("stock", Books.stock);
    delete formData['book_id'];
    delete formData['author_name'];
    delete formData['genre_name'];
    
    props.putBook(formData, token, book_id)
    .then((res) => {
      window.location.reload();
    }).catch(err => {
      console.log(err.response)
    });
    // history.push(`/book/${id}`);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <EditTwoToneIcon fontSize="small" />
      </Button>
      {/* <Button variant="outlined" color="default" onClick={handleClickOpen}>
        Edit Book
      </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Data
        </DialogTitle>
        <form onSubmit={(e) => console.log(e)}>
          <DialogContent dividers>
            <Input
              label="Title"
              key={Books.book_id}
              value={Books.book_name}
              onChange={(id, val) => setBooks({ ...Books, book_name: val })}
              type="text"
            />
            {/* {props.match.path.split('/')[1] !== 'book' && <Input
              style={{ marginLeft: 10 }}
              label="Url Image"
              onChange={(e) => setBooks({ ...Books, image: e.target.files[0] })}
              type="file"
            />} */}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl style={{ marginLeft: 12, marginTop: 12 }}>
                  <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                  <Select
                    defaultValue={genre_id}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Books.genre_id}
                    onChange={(e) =>
                      setBooks({ ...Books, genre_id: e.target.value })
                    }
                  >
                    {props.genre.data.map((genre) => (
                      <MenuItem value={genre.genre_id}>
                        {genre.genre_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl style={{ marginLeft: 12 }}>
                  <InputLabel id="demo-simple-select-label">Author</InputLabel>
                  <Select
                  defaultValue={author_id}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Books.author_id}
                    onChange={(e) =>
                      setBooks({ ...Books, author_id: e.target.value })
                    }
                  >
                    {props.author.data.map((datas) => (
                      <MenuItem value={datas.author_id}>
                        {datas.author_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Input
              label="Description"
              value={Books.description}
              onChange={(id, val) => setBooks({ ...Books, description: val })}
              type="text"
            />
            <Input
              label="Status"
              value={Books.status}
              onChange={(id, val) => setBooks({ ...Books, status: val })}
              type="text"
            />
            <Input
              label="Stock"
              value={Books.stock}
              onChange={(id, val) => setBooks({ ...Books, stock: val })}
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="default" onClick={() => handleSubmit()}>
              Save
            </Button>
          </DialogActions>
        </form>
     
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
  author: state.author,
  genre: state.genre,
});

const mapDispatchToProps = { putBook, getBook, getBookId, getAuthor, getGenre };
export default connect(mapStateToProps, mapDispatchToProps)(EditBooks);
