import React from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default class UsersList extends React.Component {
  HOST_API = 'https://reqres.in/api';
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(this.HOST_API + `/users`)
      .then(res => {
        const users = res.data.data;
        this.setState({ users });
      })
  }

  render() {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <h2>List of users</h2>
        {
          this.state.users
            .map(person =>
              <ListItem alignItems="flex-start" key={person.id}>
                <ListItemAvatar>
                  <Avatar alt="Avatar" src={person.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={person.email}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {person.first_name} {person.last_name}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
        }
      </List>
    )
  }
}