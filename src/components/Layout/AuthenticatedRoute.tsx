import React from 'react';
import { Redirect } from 'react-router-dom'
import LayoutRoute from './LayoutRoute'
import { store } from '../../redux/store';

function AuthenticatedRoute(route: any) {
    const user = store.getState().auth.user
    if (user) {
        return <LayoutRoute {...route} />
    } else {
        return <Redirect to={{ pathname: '/login' , state: { from: route.location.pathname}}} />
    }
}



export default AuthenticatedRoute;