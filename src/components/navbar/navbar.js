import React from 'react';
import Login from '../login'
import { store } from '../../store/store';
import { toggleLoginModal, signIn, toggleSignupModal } from '../../store/actions';
import GoogleAutucomplete from '../google-autocomplete'
import SignUp from '../signUp';
import './navbar.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Redirect} from 'react-router-dom'


export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            loginModalShown: false,
            signUpModalShown: false,
            goToAppartHunt: false,
        };

        store.subscribe(() => {
            let state = store.getState()
            this.setState({
                loginModalShown: state.applicationState.toggleLoginModal,
                signUpModalShown: state.applicationState.toggleSignupModal,
                user: state.applicationState.user
            });
        });

    }

    showSignInModal = () => {
        store.dispatch(toggleLoginModal(true))

    }
    showSignUpModal() {
        store.dispatch(toggleSignupModal(true))

    }

    signOut() {
        store.dispatch(toggleLoginModal(false))
        store.dispatch(signIn(false))
        localStorage.removeItem('user')
        localStorage.removeItem('access-token')
    }

    goToAppartHuntPage = () => {
        this.setState({
            goToAppartHunt: true
        })
    }
    resetGoToApprtHunt = () => {
        this.setState({
            goToAppartHunt: false
        })
    }

    render() {
        if(this.state.goToAppartHunt ) {
           if ( window.location.pathname!== '/appart-hunt') {
            return (
                <Redirect to={'/appart-hunt'}/>
                
            )
           }
           
        } else if (this.state.goToAppartHunt) {
            console.log('here')

            this.resetGoToApprtHunt()
        }

        let isConnected = this.state.user && this.state.user !== null;
        let username = isConnected ? `${this.state.user.first_name} ${this.state.user.last_name}` : ''

        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">Find It</Link>



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
                    <div className="aligned-section">
                        <GoogleAutucomplete></GoogleAutucomplete>
                    </div>


                    <div className="navbar-end">
                        <div className="navbar-item">
                            {isConnected ? (
                                <span className="aligned-section username">  <strong> {username} </strong>
                                    <Link className="button is-light" to="/appart-hunt">Find It</Link>
                                
                                    <a className="button is-light" onClick={() => this.signOut()}>
                                        Sign out
                                </a> </span>

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