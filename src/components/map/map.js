import React from 'react';
import Script from 'react-load-script';
import './map.css';
import axios from 'axios'
import { store } from '../../store/store'
import {setAdPreviewDetails} from '../../store/actions'
let data = require('../../keyfile.json');

export default class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            ads: [],
            opportunityMarkers: [],
            map: null,
            showAdPreview: false
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
            this.setState({
                map: this.map
            })

            this.map.addListener('bounds_changed', (e) => {
                this.getOpportunities(this.map.getBounds())
            })



            if (this.props.markersToShow && this.props.markersToShow.length) {
                let oppMarkers = [];
                this.props.markersToShow.map(mark => {
                    oppMarkers.push(new google.maps.Marker({ position: { lat: mark._source.lat, lng: mark._source.lng }, map: this.state.map }))
                })
                this.setState({
                    opportunityMarkers: oppMarkers
                })
            }

            let marker = new google.maps.Marker({ position: userLocation, map: this.map });
        });


    }

    getOpportunities = (bounds) => { //minLat, maxLat, minLong, maxLong
        axios.get(`http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/ads/find-in-bounds?minLat=${bounds.na.j}&maxLat=${bounds.na.l}&minLong=${bounds.ga.j}&maxLong=${bounds.ga.l}`).then(data => {
            this.setState({
                opportunityMarkers: data.data.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handleMarkerClick =(marker) =>{
        store.dispatch(setAdPreviewDetails(marker))
        
        // this.setState({
        //     showAdPreview: marker
        // })
    }

    render() {
        let showAdPreview = this.state.showAdPreview;
        let key = data.key;
        let url = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        let iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        if (this.state.opportunityMarkers && this.state.opportunityMarkers.length && google) {
            let oppMarkers = [];
            this.state.opportunityMarkers.map(mark => {
                let marker = new google.maps.Marker({
                    position: { lat: parseFloat(mark._source.lat), lng: parseFloat(mark._source.long) }, map: this.map,
                    icon: {
                        url: iconUrl
                    },
                })
                marker.addListener('click', (e) => {e  = mark._source ; this.handleMarkerClick(e)})
                oppMarkers.push(marker)
            })
           
        }
        return (
            <div>
                <Script url={url} onLoad={this.handleScriptLoad} />
                <div id="map"></div>
                
                
            </div>
        )
    }
}  