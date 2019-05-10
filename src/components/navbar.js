import React from 'react';
import Login from './login'
import { store } from '../store/store';
import { toggleLoginModal, signIn, toggleSignupModal } from '../store/actions';
import GoogleAutucomplete from './google-autocomplete'
import SignUp from './signUp';


export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            loginModalShown: false,
            signUpModalShown: false
        };
        
        store.subscribe(() => {
            let state = store.getState()
            console.log('subs', state, state.applicationState.applicationState)
            this.setState({
                loginModalShown: state.applicationState.toggleLoginModal,
                signUpModalShown:  state.applicationState.toggleSignupModal,
                user: state.applicationState.user
            });
        });
    
    }

    showSignInModal = () => {
        store.dispatch(toggleLoginModal(true))

    }
    showSignUpModal() {
        console.log('here')
        store.dispatch(toggleSignupModal(true))

    }

    signOut() {
        store.dispatch(toggleLoginModal(false))
        store.dispatch(signIn(false))
        localStorage.removeItem('user')
        localStorage.removeItem('access-token')


    }

    render() {
        let loginModalShown = this.state.loginModalShown;
        let signUpModalShown = this.state.signUpModalShown;
        let isConnected = this.state.user && this.state.user !== null;
        let username = isConnected ? `${this.state.user.first_name} ${this.state.user.last_name}` : ''

        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="">
                        Find It
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Home
      </a>

                        <a className="navbar-item">
                            Documentation
      </a>


                    </div>
                    <GoogleAutucomplete></GoogleAutucomplete>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            {isConnected ? (
                                <span> Welcome <strong> {username} </strong>
                                <a className="button is-light" onClick={() => this.signOut()}>
                                            Sign out
                                </a></span>
                                
                            ) : (
                                    <div className="buttons">
                                        <a className="button is-primary" onClick={this.showSignUpModal}>
                                            <strong>Sign up</strong>
                                        </a>
                                        <a className="button is-light" onClick={this.showSignInModal}>
                                            Log in
                                </a>
                                    </div>
                                )}

                        </div>
                    </div>
                </div>


                <Login isActive={this.state.loginModalShown}></Login>
                <SignUp isActive={this.state.signUpModalShown}></SignUp>

            </nav>

        )
    }
}