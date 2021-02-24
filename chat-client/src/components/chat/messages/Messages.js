import React from 'react'
import Message from '../message/Message'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
function Messages({messages,user_id}) {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {/* {user_id} */}
            {messages.map(msg=>
            <ListItem alignItems="flex-start" key={msg._id}><Message message={msg} current_uid={user_id}/></ListItem>)}
        </List>
    )
}

export default Messages
