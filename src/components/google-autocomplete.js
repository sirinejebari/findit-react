import React from 'react'
import Script from 'react-load-script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
let  data = require('../keyfile.json');
export default class GoogleAutucomplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            q: '',
            suggestions: []
        }
    }



    updateInput = (e) => {
        this.setState({
            q: e.target.value,
        })
        if (this.state.q.length > 3) {
            let mycallback = (results) => {
                this.setState({
                    suggestions: results
                })
            }

            this.autocompleteService.getPlacePredictions(
                { input: this.state.q }, mycallback);
        }

    }

    handleScriptLoad = () => {
        var options = { types: ['(cities)'] };

        // Initialize Google Autocomplete 
        /*global google*/
        let mycallback = (results) => { console.log("results:", results) }
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK;

    }
    handlePlaceSelect = (place) => {
        this.setState({
            suggestions: []
        })

        // // Extract City From Address Object
        // let addressObject = this.autocomplete.getPlace();
        // let address = addressObject.address_components;

        // // Check if address is valid
        // if (address) {
        //     // Set State
        //     this.setState(
        //         {
        //             city: address[0].long_name,
        //             query: addressObject.formatted_address,
        //         }
        //     );
        // }
    }
    render() {
        let key = data.key;
        let url = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        let arrayOfSuggestions = [];
        if (this.state.suggestions && this.state.suggestions.length) {
            this.state.suggestions.map((item, index) => {
                arrayOfSuggestions.push(
                    <a key={index} className="list-item" onClick={() => this.handlePlaceSelect(item)}>
                        {item.description}
                    </a>
                )
            })
        }
        return (
            <div>
                <Script url={url} onLoad={this.handleScriptLoad} />
                <div className="control field has-icons-left">
                    <input className="input is-rounded" type="text" name="search" onChange={this.updateInput} placeholder="Your dream home..." />
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="search" />

                    </span>
                    <div className="list is-hoverable">
                        {arrayOfSuggestions}
                    </div>
                </div>
            </div>
        )
    }
}