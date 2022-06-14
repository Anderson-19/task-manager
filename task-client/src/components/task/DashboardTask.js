import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { red } from '@material-ui/core/colors';

import { Navbar } from '../ui/Navbar';
import { CardTask } from '../ui/Card';
import { AuthContext } from "../../state/auth/AuthContext";
import { taskDesactive, taskStartLoading } from "../../state/actions/task";

export const DashboardTask = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const { user: { user }, task, dispatchTask } = useContext( AuthContext )
    const [contentTask, setContentTask] = useState([]);
    const [tablaTask, setTablaTask]= useState([]);
    const [search, setSearch] = useState({
      task: '',
      name: ''
    });

    useEffect(()=>{  
      taskStartLoading( user.token, dispatchTask, setContentTask );
    }, [ dispatchTask, setContentTask ])

    const getSearch = (name, value) =>{
      setSearch({...search, [name]: value})
      filtrar(search.task);
    }

    const filtrar=(terminoBusqueda)=>{
      let resultadosBusqueda = contentTask.filter((elemento)=>{
        if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
          return elemento;
        }
      });
      setTablaTask(resultadosBusqueda);
    }

    const handleAdd = () => {
      dispatchTask( taskDesactive() );
      navigate('/dashboard/add')
    }
    return (
      <div >
        <Navbar 
          type={'dashboard'}
          name={user.user.name}  
          lastname={user.user.lastname}
          setSearch={getSearch}
          auth={ user.user.uid }
        />
        <Tooltip title="Add Task" aria-label="add" >
          <Fab 
            color="primary" 
            className={classes.absolute} 
            onClick={ handleAdd }>
            <AddIcon/>
          </Fab>
        </Tooltip>
        <div style={{display: 'flex', margin: 25}}>
        { search.task.length > 0 ? (
          tablaTask.map(tasks =>{
              return(
                <CardTask 
                  task={tasks}
                  user={user.user}
                  token={user.token}
                />
              );
            })
          ):(
            task.tasks.map(tasks =>{
              return(
                <CardTask 
                  task={tasks}
                  user={user.user}
                  token={user.token}
                />
              );
            })
          )}
        </div>
      </div>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 280,
    margin: 20,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: '90%', 
  },
  avatar: {
    backgroundColor: red[700],
    fontSize: 10,
    width: '100%'
  },
}));
