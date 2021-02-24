import axios from 'axios'
import React, {useContext,useEffect} from 'react';
import {UserContext} from '../../UserContext'
import {useHistory} from 'react-router-dom'
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    let history=useHistory();
    const {user,setUser} = useContext(UserContext);

     const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
};
const logout = async()=>{
    await axios.get(`http://localhost:5000/logout`,{ withCredentials: true });
    setUser(null)
    setAnchorEl(null);
    history.push('/') 
    }
const login = ()=>{
    setAnchorEl(null);
    history.push('/login') 
    }
const signup = ()=>{
    setAnchorEl(null);
    history.push('/signup') 
    }
    
    
    return (
        // <div>
        //     <nav>
        //         <div className="nav-wrapper">
        //         <a href="/" className="brand-logo">Chat</a>
        //         <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        //         <ul className="right hide-on-med-and-down">
        //             {!user?(
        //                 <div>
        //             <li><a href="/login">Login</a></li>
        //             <li><a href="/signup">Signup</a></li>
        //             </div>):
        //             (<li><a onClick={logout}>Loguot</a></li>)}
        //         </ul>
        //         </div>
        //     </nav>

        //     <ul className="sidenav" id="mobile-demo">
        //     {!user?(
        //                 <div>
        //             <li><a href="/login">Login</a></li>
        //             <li><a href="/signup">Signup</a></li>
        //             </div>):
        //         <li><a onClick={logout}>Loguot</a></li>}

        //     </ul> 
        // </div>
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" 
          onClick={handleClick}> 
            <MenuIcon />
          </IconButton>
           <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {user?
                <MenuItem onClick={logout}>Logout</MenuItem>
                :
                <div>
            <MenuItem onClick={login}>Login</MenuItem>
            <Divider />
        <MenuItem onClick={signup}>Signup</MenuItem>
        </div>

          }
      </Menu>
          <Typography variant="h6" className={classes.title}>
            chat
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default Navbar
