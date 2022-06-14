import React, {useState, useEffect, useContext} from "react";
import Button from '@material-ui/core/Button';
import { Navbar } from '../../components/ui/Navbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Swal from 'sweetalert2';

import { AuthContext } from "../../state/auth/AuthContext";
import { startTaskAddNew, startTaskUpdate } from "../../state/actions/task";

import './styles.css';

const now = moment().minutes(0).seconds(0).add( 1, 'hours' );

const initTask = {
    name: '',
    tag: '',
    description: '',
    img: '',
    date: now.toDate(),
    hour: now.toDate().getHours()
}

export const AddTask = () => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState( initTask );
    const [date, setDate] = useState( now.toDate()  );
    const { user: { user }, task: { activeTask }, dispatchTask } = useContext( AuthContext )
    const [buttonEdit, setButtonEdit] = useState(false);
    const navigate = useNavigate();

    const { name, tag, description, img, date: Date } = formValues;
    
    useEffect(()=>{
        if ( activeTask ) {
            setButtonEdit(true);
            setFormValues( activeTask );
        } else {
            setFormValues( initTask );
        }
    }, [ activeTask, setFormValues ])

    const handleOnChangeDate = (e) => {
        setDate(e);
        setFormValues({
            ...formValues,
            date: e
        });
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if ( name.trim().length < 2) {
            setButtonEdit(false); 
            return Swal.fire('Error','El name esta vacio', 'error');
        }

        if ( tag.trim().length < 2) {
            setButtonEdit(false); 
            return Swal.fire('Error','El tag esta vacio', 'error');
        }

        if ( description.trim().length < 2) {
            setButtonEdit(false); 
            return Swal.fire('Error','La descripcion esta vacia', 'error');
        }

        if ( img.trim().length < 2) {
            setButtonEdit(false); 
            return Swal.fire('Error','URL esta vacio', 'error');
        }

        if ( activeTask ) {
            startTaskUpdate( formValues, user.token, dispatchTask );
            navigate('/dashboard');
        } else {
            startTaskAddNew( formValues, user.token, dispatchTask );
            navigate('/dashboard');
        }

        setButtonEdit(true);

    }

    return (
        <div>
       <Navbar type={''} auth={user.user.uid} />
            <Container component="main" maxWidth="xs" >
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        { buttonEdit ? 'Edit Task' : 'Create Task' } 
                    </Typography>
                    <form  className="container" noValidate>
                       <div className="form-group mt-4">
                            <input 
                                type="text" 
                                className={ `form-control ${ !name && 'is-invalid' }` }
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-lg"
                                value={name}
                                placeholder={'Name Task'}
                                onChange={ handleInputChange } 
                                name="name"
                            />

                       </div>

                       <div className="form-group ">
                            <input 
                                type="text" 
                                className="form-control"
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-lg"
                                value={tag}
                                placeholder={'Tag Task'}
                                onChange={ handleInputChange } 
                                name="tag"
                            />
                       </div>

                       <div className="form-group-lg">
                            <DateTimePicker 
                                 className="form-control"
                                 onChange={ handleOnChangeDate } 
                                 value={ Date } 
                                 name="date"
                             />
                       </div>

                       <div className="form-group mt-3">
                        <textarea 
                            type="text"
                            onChange={ handleInputChange }
                            value={ description } 
                            className="form-control"
                            placeholder="Description"
                            rows="5"
                            name="description"
                        ></textarea>
                    </div>

                        <div className="form-group ">
                            <input 
                                type="text" 
                                className={ `form-control ${ !img && 'is-invalid' }` }
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-lg"
                                value={img}
                                placeholder= "URL"
                                onChange={ handleInputChange }
                                name="img"
                            />
                        </div>

                        <div className="">
                            <img 
                                style={{width: '100%', marginLeft: '0%'}}
                                src={img}  
                            />
                        </div>
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            fullWidth
                            onClick={ handleSubmit }
                        >{ buttonEdit ? 'Edit Task' : 'Create Task' }</Button>
                    </form>
                </div> 
            </Container>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
  }));
