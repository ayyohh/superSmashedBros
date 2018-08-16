import React, { Component } from 'react';
import MainContainer from '../MainContainer/MainContainer';
import Auth from '../Login/Auth';

const auth = new Auth();


class Home extends Component {
  login() {
    this.props.auth.login();
  }
  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <div className="">
              <div>
                <h4>
                  You are logged in! Please{' '}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={this.logout}
                  >
                    Log Out
                  </a>
                  {' '}to continue.
                </h4>
                </div>

                <MainContainer />


              </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
