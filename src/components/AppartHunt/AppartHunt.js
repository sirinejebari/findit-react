import React from 'react'
import axios from 'axios'
import { store } from '../../store/store'
import './AppartHunt.scss'
import List from './List/List'
export default class AppartHunt extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lists: [],
            listsSharedWithUser: [],
            showAddDialog: false,
            name: null,
            user: null
        }
    }

    componentWillMount() {
        this.setState({
            user: store.getState().applicationState.user
        }, () => {
            this.fetchLists();
            this.fetchListsSharedWithMe()
        })

    }


    fetchLists = () => {
        axios.get('http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/apt-hunt/apt-hunt-list-by-user').then(data => {
            let results = data.data.results;
            this.setState({
                lists: results
            })
        }).catch(err => {
            console.log(err)
        })
    }

    fetchListsSharedWithMe = () => {
        axios.get(`http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/apt-hunt/shared-apt-hunt-list/${this.state.user.elementId}`).then(data => {
            let results = data.data.results;
            console.log(results)
            this.setState({
                listsSharedWithUser: results,
            })
        }).catch(err => {
            console.log(err)
        })
    }



    toggleAddNewDisalog = () => {
        this.setState({
            showAddDialog: !this.state.showAddDialog
        })
    }

    addNew = () => {
        axios.post('http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/apt-hunt/apt-hunt-list', {
            name: this.state.name,

        }).then(() => {
            this.toggleAddNewDisalog()
            this.fetchLists()
        }).catch((err) => console.log('error', err))

    }

    linkChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        let listOfAds =[];
        let sharedWithUser = [];
        this.state.lists.map((ad, index) => {
            return listOfAds.push(
                <List user={this.state.user} className="list-item" key={'wishList' + index} list={ad}></List>
            )
        });
        this.state.listsSharedWithUser.map((ad, index) => {
            return sharedWithUser.push(
                <List user={this.state.user} className="list-item" key={'sharedWittMe' + index} list={ad}></List>
            )
        })
        return (<div className="appart-hunt-component">
            <div className="card lists">
                {this.state.showAddDialog ? '' : <button className="button add-new-button " onClick={this.toggleAddNewDisalog}> Add New List</button>}

            </div>
            <div className="userLists">{listOfAds}</div>
            <div className="userLists">{sharedWithUser}</div>
            {this.state.showAddDialog ? <div className="card dialog">

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="New list" onChange={(e) => this.linkChange(e)} />
                    </div>
                </div>
                <div className="dialog-actions">
                    <button className="button is-primary" onClick={() => this.addNew()}>Submit</button>
                    <button className="button is-secondary" onClick={() => this.toggleAddNewDisalog()}>Cancel</button>

                </div>
            </div> : ''}
        </div>)
    }
}