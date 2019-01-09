import React, { Component } from 'react';
import {TopBar} from './TopBar';
import {Main} from './Main';
import '../styles/App.css';

const TOKEN_KEY = 'TOKEN_KEY';

class App extends Component {
  state = {
    isLoggedin : !!localStorage.getItem(TOKEN_KEY)
  }
  handleLogin = (data) => {
    localStorage.setItem(TOKEN_KEY, data);
    this.setState({
      isLoggedin : true 
    });
  }
  handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    this.setState({
      isLoggedin :false
    });
  }
  render() {
    return (
      <div className="App">
        <TopBar 
        isLoggedin = {this.state.isLoggedin} 
        handleLogout = {this.handleLogout}
        />
        <Main 
        isLoggedin = {this.state.isLoggedin} 
        handleLogin = {this.handleLogin}
        />
      </div>
    );
  }
}

export default App;
