import Swal from "sweetalert2";
import { prepareTasks } from "../../helpers/prepareTasks";

import { createTask, deleteTask, getTasks, updateTask } from "../../services/taskServices";
import { types } from "../types/types";

export const startTaskAddNew = async ( task, token, dispatch ) => {

    try {
        const res = await createTask( task, token )

        if ( res.verify ) {
            dispatch( taskAddNew( task ) );
        }
 
    } catch (error) {
        console.log(error);
        return Swal.fire('Error', error, 'error');
    }
    
}

const taskAddNew = ( task ) => ({
    type: types.task.taskAddNew,
    payload: task
});

export const startTaskUpdate = async ( task, token, dispatch ) => {

    try {
        const res = await updateTask( task, token, task._id );

        if ( res.verify ) {
            dispatch( taskUpdate( task ) );
        } 
    } catch (error) {
        console.log(error);
        return Swal.fire('Error', error, 'error');
    }
    
}

const taskUpdate = ( task ) => ({
    type: types.task.taskUpdate,
    payload: task
});

export const taskStartLoading = async ( token, dispatch, setContentTask ) => {
    
    try {
        
        const res = await getTasks( token );
       
        if ( res.verify ) {
            setContentTask( res.tasks );
            const tasks = prepareTasks( res.tasks );
            dispatch( tasksSaved( tasks ) );
        }
    } catch (error) {
        console.log(error)
    }

}

const tasksSaved = ( task ) => ({
    type: types.task.tasksSaved,
    payload: task
});

export const taskStartDelete = async ( id, token, dispatch ) => {

    try {
        const res = await deleteTask( id, token );
        if ( res.verify ) {
            dispatch( taskDelete() );
        } else {
            Swal.fire('Error', 'Error al borrar la tarea', 'error');
        }
    } catch (error) {
        console.log(error)
    }
    
}

const taskDelete = () => ({
    type: types.task.taskDelete
});

export const taskSetActive = (task) => ({
    type: types.task.taskSetActive,
    payload: task
});

export const taskDesactive = () => ({
    type: types.task.taskDesactive
});

export const tasksCleaning = () => ({
    type: types.task.tasksCleaning
});