import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { DashboardRouter } from './DashboardRouter';
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';
import { LogIn } from '../components/auth/LogIn';
import { SignIn } from '../components/auth/SignIn';

export const AppRouter = () => {
  /* const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [ navigate ]) */

  return (
    <BrowserRouter>
        <Routes>

            <Route path="/login" element={ 
              <PublicRoute>                 
                  <LogIn /> 
              </PublicRoute>
            } />

            <Route path="/signin" element={ 
              <PublicRoute>                 
                  <SignIn /> 
              </PublicRoute>
            } /> 

            <Route path="/*" element={ 
               <PrivateRoute>
                  <DashboardRouter /> 
               </PrivateRoute>
            } />

        </Routes>
    </BrowserRouter>
  )
}