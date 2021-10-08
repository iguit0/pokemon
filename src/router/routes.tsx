import React from 'react'
import { RouteProps } from 'react-router-dom'
import { WelcomePage } from '../pages/Welcome'
import { CreatePage } from '../pages/Create'
import { HomePage } from '../pages/Home'

const routes: RouteProps[] = [
    {
        path: '/',
        exact: true,
        children: <WelcomePage />
    },
    {
        path: '/create',
        children: <CreatePage />
    },
    {
        path: '/home',
        children: <HomePage />
    },
    {
        path: '*',
        children: <h1>Not Found</h1>
    }
]

export default routes
