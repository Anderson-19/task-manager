import React, { useEffect, useReducer } from 'react';

import { AppRouter } from './routes/AppRouter';
import { AuthContext } from './state/auth/AuthContext';
import { authReducer } from './state/reducers/authReducer';
import { taskReducer } from './state/reducers/taskReducer';

export const TaskApp = () => {

  const initialStateTask = {
    tasks: [],
    activeTask: null
}

  const [ user, dispatch ] = useReducer(authReducer, {});
  const [ task, dispatchTask ] = useReducer(taskReducer, initialStateTask);

  useEffect(() => {
    localStorage.setItem( 'user', JSON.stringify({ logged: false }) );
  }, [ ])

  return (
    <AuthContext.Provider value={{ user, dispatch, task, dispatchTask }} >
        <AppRouter />
    </AuthContext.Provider>
  )
}

