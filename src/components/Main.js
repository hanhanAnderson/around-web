import React from 'react';
import { Register } from './Register'
import { Login } from './Login';
import { Home } from './Home';
import { Switch, Route, Redirect } from 'react-router-dom'

export class Main extends React.Component {
    getRedirect = () => {
        return (this.props.isLoggedin ?
             <Redirect to="/home" /> : <Redirect to="/login" />
        )
    }
    getLogin = () => {
        return this.props.isLoggedin ? <Redirect to= "/home" /> :
        <Login handleLogin={this.props.handleLogin} />
    }
    getHome = () => {
        return this.props.isLoggedin ? <Home /> : <Redirect to="/login" />
    }
    render() {
        return (
            <div className='main'>
                <Switch>
                    <Route exact path="/" render={this.getRedirect} />
                    <Route path="/login" component={this.getLogin} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" render={this.getHome} />
                    <Route render={this.getRedirect} />
                </Switch>
            </div>
        );
    }
}
