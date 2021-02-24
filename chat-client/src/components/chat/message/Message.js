import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
function Message({message:{name, user_id, text},current_uid}) {
    const isCurrentUser = (user_id=== current_uid)
const classes = useStyles();

    // console.log('current_uid',current_uid)
    // console.log('user_id' ,user_id)
    
    return (
        isCurrentUser?(

        <ListItemText  value={`ME: ${text}`}>
            {`ME: ${text}`}
        </ListItemText>
            
        
            ):
            <ListItemText component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"   p={2}   value={`${name}: ${text}`}>
                {`${name}: ${text}`}
            </ListItemText>


    )
}

export default Message
