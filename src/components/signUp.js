import React from 'react'
import { toggleLoginModal, toggleSignupModal } from '../store/actions';
import { store } from '../store/store'
import axios from 'axios'

export default class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: ''
        }
    }

    close() {
        store.dispatch(toggleSignupModal(false))
    }

    signIn = () => {
        axios.post('http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/customers', {
            "email": this.state.email,
            "password": this.state.password,
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "phone_number": this.state.phone_number,
        })
            .then(response => {

                store.dispatch(toggleSignupModal(false))
                store.dispatch(toggleLoginModal(true))


            })
    }


    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    handleFisrtNameChange = (e) => {
        this.setState({ first_name: e.target.value });
    }
    handleLastNameChange = (e) => {
        this.setState({ last_name: e.target.value });
    }
    handlePhoneChange = (e) => {
        this.setState({ phone_number: e.target.value });
    }

    render() {
        return (
            <div className={"modal " + (this.props.isActive ? 'is-active' : '')}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box ">

                        <div className="field">
                            <label className="label">First Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Jhon" onChange={this.handleFisrtNameChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Last Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Doe" onChange={this.handleLastNameChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Phone Number</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="1234567890" onChange={this.handlePhoneChange} />
                            </div>
                        </div>


                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="something@something.com" onChange={this.handleEmailChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="" onChange={this.handlePasswordChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Confirm password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="" />
                            </div>
                        </div>

                        <div className="control level-item has-text-centered">
                            <button className="button is-link" onClick={this.signIn}>Create Account</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}