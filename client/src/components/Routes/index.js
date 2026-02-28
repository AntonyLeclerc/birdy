import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import SignInForm from '../Log/SignInForm';
import SignUpForm from '../Log/SignUpForm';
import NavigationPanel from '../NavigationPanel';
import Settings from '../Settings';
import User from '../User';

const index = (props) => {
    return (
        <Router>
            <NavigationPanel />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Route path="/user/:username" exact component={User} />
                <Route path="/login" exact component={SignInForm} />
                <Route path="/settings" exact component={Settings} />
                <Route path="/signup" exact component={SignUpForm} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;