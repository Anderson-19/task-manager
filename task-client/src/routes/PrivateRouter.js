import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {

    const user = localStorage.getItem('user');

    return JSON.parse(user).logged
          ? children
          : <Navigate to="/login" />

}