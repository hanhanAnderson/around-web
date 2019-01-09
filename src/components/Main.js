import React from 'react';
import { Register } from './Register'
import { Login } from './Login';
import { Home } from './Home';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

export class Main extends React.Component {
    getLogin = () => {
        return (this.props.isLoggedin ?
             <Redirect to="/home" /> : <Redirect to="/login" />
        )
    }
    renderLogin = () => {
        return <Login handleLogin={this.props.handleLogin} />
    }
    render() {
        return (
            <div className='main'>
                <Switch>
                    <Route exact path="/" render={this.getLogin} />
                    <Route path="/login" component={this.renderLogin} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route render={this.getLogin} />
                </Switch>
            </div>
        );
    }
}
