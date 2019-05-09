import React from 'react'
import { toggleLoginModal, signIn } from '../store/actions';
import { store } from '../store/store'
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    close() {
        store.dispatch(toggleLoginModal(false))
    }

    signIn = () => {
        axios.post('http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/authenticate', {
            "email": this.state.email,
            "password": this.state.password
        })
            .then(response => {
                localStorage.setItem('access-token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                axios.defaults.headers.common['x-access-token'] = response.data.token;
                store.dispatch(toggleLoginModal(false))
                store.dispatch(signIn(response.data.user))


            })
    }


    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });

    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className={"modal " + (this.props.isActive ? 'is-active' : '')}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box ">

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="something@something.com" onChange={this.handleEmailChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="" onChange={this.handlePasswordChange} />
                            </div>
                        </div>

                        <div className="control level-item has-text-centered">
                            <button className="button is-link" onClick={this.signIn}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}