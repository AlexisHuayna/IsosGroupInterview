import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class UserAdd extends React.Component {
  HOST_API = 'https://reqres.in/api';

  state = {
    email: '',
    first_name: '',
    last_name: '',
    open: false
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangeFirstName = event => {
    this.setState({ first_name: event.target.value });
  }

  handleChangeLastName = event => {
    this.setState({ last_name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };

    axios.post(this.HOST_API + `/users`, { user })
      .then(res => {
        console.log(res);
        if (res.status == 200 || res.status == 201) {
          this.setState({open : true, email: '', first_name: '', last_name: ''});
        }
      })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open : false});
  };

  render() {
    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <h2>Form to add user</h2>
        <FormControl>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={this.state.email}
            onChange={this.handleChangeEmail} />
          <TextField
            id="standard-basic"
            label="First Name"
            variant="standard"
            value={this.state.first_name}
            onChange={this.handleChangeFirstName} />
          <TextField id="standard-basic"
            label="Last Name"
            variant="standard"
            value={this.state.last_name}
            onChange={this.handleChangeLastName} />
          <Button type="submit" variant="contained">Add</Button>
        </FormControl>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
              Usuario agregado!
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    )
  }
}