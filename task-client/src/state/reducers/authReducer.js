import { types } from "../types/types";

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.auth.login:
            return {
                ...action.payload
            }
        
        case types.auth.logout:
            return { }
    
        default:
            return state;
    }

}