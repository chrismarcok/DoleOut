/**
 * This is the profile view from the USERS perpsective  (as opposed to the admin's)
 * The admin can edit fields. The user cannot.
 */


import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../comps/Header'
import Fetch from '../scripts/fetch.js';
import '../style/Profile.css'
import Axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            id: this.getUserNum(),
            displayName: "",
            firstname: "",
            lastname: "",
            avatar: "",
            description: "",
            email: "",
            pref: "",
            paypal: "",
            editing: false
        }
    }

    componentDidMount() {
        const id = this.getUserNum();
        Axios.get("/api/u/" + id)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    const data = response.data;
                    this.setState({
                        firstname: data.firstName,
                        lastname: data.lastName,
                        avatar: data.avatarURL,
                        description: data.description,
                        email: data.email,
                        pref: data.preference,
                        paypal: data.paypalURL,
                        displayName: data.displayName,
                    });
                    const pic = document.querySelector("#profile-pic-" + this.state.id);
                    pic.style.backgroundImage = "url('" + this.state.avatar + "')";
                } else {
                    this.props.history.push('/404');
                }
            })
            .catch(err => {
                this.props.history.push('/404');
            });
    }

    /**
     * Get the id number of this user.
     */
    getUserNum() {
        const { user_number } = this.props.match.params
        return user_number
    }

    render() {
        // const user = this.getUser();
        // if (user === undefined){
        //     return <Redirect to='/404'/>
        // }

        return (
            <div>
                <Header />

                <div className="profile-container">
                    <div className="profile-pic-and-name">
                        <div className="profile-pic" id={"profile-pic-" + this.state.id}>
                        </div>
                        <div className="profile-name-container">
                            <h1>{this.state.displayName} <a href={this.state.paypal} target="_blank" rel="noopener noreferrer"><i className="fa fa-cc-paypal"></i></a></h1>
                            {this.state.firstname} {this.state.lastname}
                        </div>
                        <div className="profile-desc">
                            <b>Description</b>
                            <p>{this.state.description}</p>
                            <br />
                            <b>Preferred Payment Method</b>
                            <p>{this.state.pref}</p>
                        </div>
                    </div>
                    <div className="profile-info-container">
                        <h3>Email</h3>
                        <p>{this.state.email}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile 