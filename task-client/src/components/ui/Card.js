import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { date } from '../../services/taskServices';
import { AuthContext } from "../../state/auth/AuthContext";
import { taskSetActive, taskStartDelete } from "../../state/actions/task";
import moment from "moment";

export const CardTask = ({ task, user, token }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const date = moment(task.date).toDate();

    const { dispatchTask } = useContext( AuthContext )

    const onSelectTask = () => {
      dispatchTask( taskSetActive( task ) );
      navigate('/dashboard/add');
    }

    const taskDelete = () => {
      dispatchTask( taskSetActive( task ) );
      taskStartDelete( task._id, token, dispatchTask ) ;
    }
    
    return(
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {user.name}
              </Avatar>
            }
            action={
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            }
            title={task.name}
            subheader={ date.toDateString() }
          />
          <CardMedia
            className={classes.media}
            image={task.img}
            title="Paella dish"
          />
          <CardContent>
            <Typography style={{color: 'black'}} variant="body2" color="textSecondary" component="p">
              {task.description}
            </Typography>
          </CardContent>
            <Divider />
          <CardActions disableSpacing  style={{marginLeft: '63%'}}>
            <IconButton 
              aria-label="edit"
              onClick={ onSelectTask }
            >
              <EditIcon />
            </IconButton>
            <IconButton 
                aria-label="delete"
                onClick={ taskDelete }
              >
              <DeleteIcon />
            </IconButton>

          </CardActions>
        </Card>
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
      paddingTop: '90%', // 16:9
    },
    avatar: {
      backgroundColor: red[700],
      fontSize: 10,
      width: '100%'
    },
  }));
