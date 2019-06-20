import React from 'react'
import './List.scss'
import axios from 'axios'
export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDialogActive: false,
            isShareDialogActive: false,
            link: null,
            email: null,
            ads: [],
            totalAds: 0
        }
    }

    toggleIsDialogActive = () => {
        this.setState({
            isDialogActive: !this.state.isDialogActive
        })
    }

    toggleIsShareDialogActive = () => {
        this.setState({
            isShareDialogActive: !this.state.isShareDialogActive
        })
    }

    handleUpdateLink = (e) => {
        this.setState({
            link: e.target.value
        })
    }

    handleUpdateEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    componentWillMount() {
        this.fetchItemsInList()

    }

    fetchItemsInList = () => {
        axios.get(`http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/apt-hunt/ads-in-list/${this.props.list.elementId}`).then(data => {
            this.setState({
                ads: data.data.results,
                totalAds: data.data.total
            })
        }).catch(err => {
            console.log(err)
        })
    }
    addToList = () => {

        axios.post(`http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/apt-hunt/add-to-list/${this.props.list.elementId}`, {
            link: this.state.link,
            user: this.props.user

        }).then((data) => {
            this.toggleIsDialogActive();
            this.fetchItemsInList();
        }).catch((err) => console.log('error', err))


    }

    shareList = () => {

        axios.put(`http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/apt-hunt/add-contributer/${this.props.list.elementId}`, {
            email: this.state.email,
            list: this.props.list
        }).then(() => console.log('invitation sent!'), err => console.log(err))


    }

    deleteItemFromList = (ad) => {
        axios.delete(`http://ec2-35-180-189-63.eu-west-3.compute.amazonaws.com/apt-hunt/apt-hunt/${ad.elementId}`)
            .then(() => this.fetchItemsInList(), err => console.log(err))
    }
    render() {
        let list = [];
        if (this.state.ads) {
            this.state.ads.map((ad, index) => {
                list.push(
                    <tr key={'ad' + this.props.list.elementId + index}>
                        <td>{ad.user.first_name}</td>
                        <td><a target="_blank" href={ad.link}>{ad.link.substr(0, 40)}...</a></td>
                        <td>{ad.status === 'PENDING' ? ad.user.id === (this.props.user && this.props.user.id) ? ad.status : <div className="pending-buttons">
                            <button className="button is-success"><i className="fas fa-check"></i></button>
                            <button className="button is-danger"><i className="fas fa-times"></i></button>
                        </div> : ad.status}</td>
                        <td><button onClick={() => { this.deleteItemFromList(ad) }} className="button is-small is-danger"><i className="fas fa-times"></i></button></td>
                    </tr>
                )
            })
        }

        return (
            <div className="card">
                <div className="subtitle">
                    <div>{this.props.list.name} ({this.state.totalAds} items)</div>
                    <div className="add-new">
                    <button onClick={() => this.toggleIsDialogActive()} className="button is-small is-primary"><i className="fas fa-plus"></i></button>
                    <button onClick={() => this.toggleIsShareDialogActive()} className="button is-small is-info"><i className="fas fa-share-alt"></i></button>
                    </div>

                </div>


                {
                    this.state.totalAds ?
                        <table className="table is-fullwidth is-striped is-hoverable">
                            <thead>
                                <tr>
                                    <th>Posted By</th>
                                    <th>Link</th>
                                    <th>Status</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {list}
                            </tbody>
                        </table> : <div className="nothing-here">Nothing here !<button onClick={() => this.toggleIsDialogActive()} className="button is-small is-primary">Add to list</button></div>
                }


                <div className={"modal " + (this.state.isDialogActive ? 'is-active' : '')}>
                    <div onClick={() => { this.toggleIsDialogActive() }} className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Link</label>
                                </div>
                                <div className="control">
                                    <input className="input" type="text" placeholder="" onChange={(e) => this.handleUpdateLink(e)} />
                                </div>
                            </div>

                            <div className="control modal-actions level-item has-text-centered">
                                <button className="button is-link" onClick={this.addToList}>Add</button>
                                <button className="button is-secondary" onClick={this.toggleIsDialogActive}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"modal " + (this.state.isShareDialogActive ? 'is-active' : '')}>
                    <div onClick={() => { this.toggleIsShareDialogActive() }} className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Email</label>
                                </div>
                                <div className="control">
                                    <input className="input" type="text" placeholder="" onChange={(e) => this.handleUpdateEmail(e)} />
                                </div>
                            </div>

                            <div className="control modal-actions level-item has-text-centered">
                                <button className="button is-link" onClick={this.shareList}>Add</button>
                                <button className="button is-secondary" onClick={this.toggleIsShareDialogActive}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div >
        )
    }
}