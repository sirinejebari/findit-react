import React from 'react'
import axios from 'axios'
import { store } from '../../store/store'

export default class AppartHunt extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ads: [{
                user: 'Majed',
                link: 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.bienici.com%2Fannonce%2Flocation%2Fissy-les-moulineaux%2Fappartement%2F2pieces%2Fimmo-facile-31946283%3Fq%3D%252Frecherche%252Flocation%252Fissy-les-moulineaux-92130%253Fsurface-min%253D40%2526surface-max%253D55%2526balcon-ou-terrasse%253Doui%2526parking%253Doui%2526non-meuble%253Doui%26fbclid%3DIwAR0nmDVHXNmkrXGIEVRFy0evkQI--HH85y2ZaPHaMccfr7v62zMcBhO6_7I&h=AT2PpHwAVmEkVAKcaUNgSdBFlaVYLLXkJnSOmlYInuBw9vU3DGe1w7veixTkXmnRu_W3dtLBdtHSsDYJlqEYyq0mPDmyVlIRpdc7CFb-oSjjzj0hXj_hGIWXZazpKe7DMsBl4A',
                status: 'PENDING'
            }],
            showAddDialog: false,
            link: null,
            user: null
        }
    }

    componentWillMount() {
        this.fetchAds()
    }


    fetchAds = () => {
        axios.get('http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/ads/apt-hunt').then(data => {
            this.setState({
                ads: data.data.results,
                user: store.getState().applicationState.user
            })
        }).catch(err => {
            alert(err)
        })
    }

    showAddNewDisalog = () => {
        this.setState({
            showAddDialog: true
        })
    }

    addNew = () => {
        axios.post('http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/ads/apt-hunt', {
            link: this.state.link,
            user: this.state.user
        }).then(() => {
            this.fetchAds()
        }).catch((err) => console.log('error', err))

    }

    linkChange = (e) => {
        this.setState({
            link: e.target.value
        })
    }

    render() {
        let listOfAds = [];
        this.state.ads.map(ad => {
            return listOfAds.push(
                <tr>
                    <td>{ad.user.first_name}</td>
                    <td><a target="_blank" href={ad.link}>{ad.link.substr(0, 40)}...</a></td>
                    <td>{ad.status === 'PENDING' ? ad.user.id === (this.state.user && this.state.user.id) ? ad.status : <div>
                        <button className="is-success">ok</button>
                        <button className="is-danger">KO</button>
                    </div> : ad.status}</td>
                </tr>
            )
        })
        return (<div>
            <div className="list">
                <button className="button" click={this.showAddNewDisalog}> Add To WishList</button>
                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>Posted By</th>
                            <th>Link</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {listOfAds}
                    </tbody>
                </table>
            </div>
            <div className="dialog">

                <div className="field">
                    <label className="label">Ad Link</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="www.google.com..." onChange={(e) => this.linkChange(e)} />
                    </div>
                </div>
                <button className="button is-primary" onClick={() => this.addNew()}>Submit</button>

            </div>
        </div>)
    }
}