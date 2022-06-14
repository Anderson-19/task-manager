import React, {useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import validator from "validator";
import Swal from "sweetalert2";

import { fetchRegister } from '../../services/userServices';
import { useForm } from "../../hooks/useForm";


export const SignIn = () => {
    const classes = useStyles();
    const [ formValues, handleInputChange ] = useForm({
      name: '',
      username: '',
      lastname: '',
      password: '',
      email: ''
    });

    const [buttonTitle, setButtonTitle] = useState('Register');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if ( isFormValid() ) {
        setButtonTitle('');

        const res = await fetchRegister( formValues );
        if ( res.verify ) {
          setButtonTitle('Register');
          navigate('/login');
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
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
            <TextField 
                  variant="outlined"
                  margin="normal" 
                  onChange={ handleInputChange } 
                  type="text" 
                  label="Name" 
                  fullWidth 
                  name="name"
              />

              <TextField 
                  variant="outlined"
                  margin="normal" 
                  onChange={ handleInputChange } 
                  type="text" 
                  label="Lastname" 
                  fullWidth 
                  name="lastname"
              />

              <TextField 
                  variant="outlined"
                  margin="normal" 
                  onChange={ handleInputChange } 
                  type="text" 
                  label="Username" 
                  fullWidth 
                  name="username"
              />

              <TextField 
                  variant="outlined"
                  margin="normal" 
                  onChange={ handleInputChange } 
                  type="email" 
                  label="Email" 
                  fullWidth 
                  name="email"
              />

              <TextField 
                  variant="outlined"
                  margin="normal" 
                  onChange={ handleInputChange } 
                  type="password" 
                  label="Password" 
                  fullWidth 
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
                  <Link href="/login" variant="body2">
                    {"Do you already have an account? Sign Up"}
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


