import React from 'react'
import Map from '../map/map'
import './home.css'
import { store } from '../../store/store'
import AdPreview from '../adPreview/adPreview';
export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            showPreview: false
        }
        store.subscribe(() => {
            let state = store.getState()
            console.log(state)
            this.setState({
                showPreview: state.mapState.adDetails
            });
        });
    }

    render() {
        let showPreview = this.state.showPreview
        return (
            <div className="map-container ">
                
                <p className="subtitle is-4">Opportunities in your area</p>
                <div className="default-view">

                    <div className="main-map card">
                        <Map ></Map>
                    </div>
                    {
                        showPreview ? (<AdPreview adDetails={showPreview}></AdPreview>) : ''
                    }
                </div>

            </div>
        )
    }
}