import { types } from "../types/types";

const initialState = {
    tasks: [],
    activeTask: null
}

export const taskReducer = ( state= initialState, action ) => {
  
    switch ( action.type ) {
        case types.task.taskSetActive:
            return {
                ...state,
                activeTask: action.payload
            }
    
        case types.task.taskAddNew:
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            }

        case types.task.tasksSaved:
            return {
                ...state,
                tasks: [ ...action.payload ]
            }

        case types.task.taskDesactive:
            return {
                ...state,
                activeTask: null
            }

        case types.task.taskUpdate:
            return {
                ...state,
                tasks: state.tasks.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.task.taskDelete:
            return {
                ...state,
                tasks: state.tasks.filter(
                    e => ( e._id !== state.activeTask._id )
                ),
                activeTask: null
            }
        
        case types.task.tasksCleaning:
            return {
                ...state,
                tasks: []
            }

        default:
            return state;
    }

}