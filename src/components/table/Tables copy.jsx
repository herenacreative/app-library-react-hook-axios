import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import {connect} from 'react-redux'

const AuthorTable = (props) => {
  const [Author, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' }
    ],
    data:[{author_name: ''}],
  });

  useEffect(() => {
    setTimeout(() => {
    console.log(Author.data.author_name)
    const token = props.auth.data.token
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/authors?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      setState({
        Author: res.data.data.results
      })
    })
    .catch((err)=>{
      console.log(err.res)
    }) 
    }, 60000);   
  }, [])


  return (
    <MaterialTable
      title="Editable Example"
      columns={Author.columns}
      data={Author.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(AuthorTable)
