import React from 'react'
import './adPreview.css'
import {Redirect} from 'react-router-dom'
export default class AdPreview extends React.Component {

    constructor() {
        super()
        this.state = {
            redirect : false
        }
    }
    goToAdDetails = () => {
        this.setState({
            redirect: true
        })
    }
    render() {
        let adDetails = this.props.adDetails
        if(this.state.redirect) {
            let url = `/ad-details/${this.props.adDetails.elementId}`
            return (
                <Redirect to={url}/>
            )
        }
        return (
            <article className="box">
                <div className="media ">
                <figure className="media-left">
                        <p className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                <p className="media-content">
                        <strong>{adDetails.title}</strong>
                        <br></br> <small>{adDetails.address}</small>

                    </p>
                    <div className="media-right">
                        <button className="delete"></button>
                    </div>
                    
                    
                </div>

                <div className="media-content">
                    <div className="content">
                        <p>
                            <br></br>
                            {adDetails.description}
                            <br></br>
                            <strong>Surface</strong>: {adDetails.surface} m²
                                 </p>
                    </div>
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <a className="button is-primary" onClick={this.goToAdDetails}>
                                Mode details
                                </a>
                        </div>

                        <div className="level-left">
                            <a className="button is-light" onClick={this.goToAdDetails}>
                                Contact owner
                                </a>
                        </div>
                    </nav>
                </div>

            </article>
        )
    }
}