import React from 'react';
import Script from 'react-load-script';
import './map.css';
let data = require('../../keyfile.json');

export default class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            ads: []
        }
    }

    loadKey = async () => {
        let data = await (await fetch('../keyfile.json'))
        return data;

    }

    handleScriptLoad = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            // Initialize Google Autocomplete 
            /*global google*/
            let userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 12, center: userLocation, streetViewControl: false, fullscreenControl: false
                });

                this.map.addListener('bounds_changed', (e) => {
                    console.log('bounds_changed!', this.map.getBounds())
                })

            let marker = new google.maps.Marker({ position: userLocation, map: this.map });
        });


    }

    render() {
        let key = data.key;
        let url = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

        return (
            <div>
                <Script url={url} onLoad={this.handleScriptLoad} />
                <div id="map"></div>
            </div>
        )
    }
}  