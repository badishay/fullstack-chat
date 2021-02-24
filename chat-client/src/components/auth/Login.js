import axios from 'axios'
import React, {useContext, useState,useEffect} from 'react';
import {UserContext} from '../../UserContext'
import {useHistory} from 'react-router-dom'
//material-ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/badishay/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Login() {
    const classes = useStyles();
    let history=useHistory();
    const {user,setUser} = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    useEffect(() => {
        if(user){
            history.push('/')
        }
    }, [user])
    const handleSubmit =async e=>{
         e.preventDefault();
         try {
            const newUser ={email,password}
            // console.log(newUser)
            // const res = await fetch('http://localhost:5000/signup/',{
            //     method:'POST',
            //     body:JSON.stringify(newUser),
            //     headers:{'Content-Type':'aplication/json',}
            // })
            const res = await axios.post(`http://localhost:5000/login`,newUser,{ withCredentials: true });
            // await res.data.user
                setUser(res.data.user)
                // console.log(user)
                history.push('/') 
         } catch (error) {
            console.log(error);            
         }
    }


    return (
        // <div>
        //     <h4>Login</h4>
        //     <form onSubmit={handleSubmit}>
        //         {/* <input type="text" placeholder="name" value={name} name="Name" onChange={e=>setName(e.target.value)} />
        //         <er></er> */}
        //         <input type="email" placeholder="email" value={email} name="Email"  onChange={e=>setEmail(e.target.value)} />
        //         <er></er>
        //        <input type="password" placeholder="password" value={password} name="Password"  onChange={e=>setPassword(e.target.value)} />
        //         <er></er>
        //         <button type='submit' >login</button>
        //     </form>
           
        // </div> 
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e=>setEmail(e.target.value)} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=>setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    )
}

export default Login
