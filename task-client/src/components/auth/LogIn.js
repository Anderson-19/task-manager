import React, {useContext, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import validator from "validator";
import Swal from "sweetalert2";

import { AuthContext } from "../../state/auth/AuthContext";
import { useForm } from "../../hooks/useForm";
import { fetchLogin } from "../../services/userServices";
import { types } from "../../state/types/types";

export const LogIn = () => {
    const classes = useStyles();
    const [ formValues, handleInputChange ] = useForm({
      email: '',
      password: ''
    });
    const [buttonTitle, setButtonTitle] = useState('Log In');
    const navigate = useNavigate();
    const { dispatch } = useContext( AuthContext );

    const handleSubmit = async (e) => {
      e.preventDefault();

      if ( isFormValid() ) {
        setButtonTitle('');

        const res = await fetchLogin( formValues );

       if ( res.verify ) {
          setButtonTitle('Log In');
          localStorage.setItem('user', JSON.stringify({ logged: true }));

          const { verify, ...user } = res;
          dispatch({ 
            type: types.auth.login,
            payload: { user } 
          }); 

          navigate('/dashboard/add');
           
        } 
      }
    }

    const isFormValid = () => {
  
      if ( !validator.isEmail( formValues.email ) ) {
          return false;
      } else if ( !validator.isLength( formValues.password, { min: 5, max: 15 } ) ){
          Swal.fire('Error', 'El password es invalido', 'error');
          return false;
      }
  
      return true;
    }

  return (
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate>
        <TextField 
            variant="outlined" 
            fullWidth 
            margin="normal"
            onChange={ handleInputChange } 
            type="email" 
            label="Email"  
            name="email"
        />

        <TextField 
            variant="outlined" 
            fullWidth 
            margin="normal"
            onChange={ handleInputChange } 
            type="password" 
            label="Password"  
            name="password" 
        />
    
        <Button 
            variant="contained"
            fullWidth  
            color="primary"
            className={classes.submit}
            onClick={ handleSubmit }
        >{buttonTitle}</Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate('/signin') } variant="body2">
                {"Don't have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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

