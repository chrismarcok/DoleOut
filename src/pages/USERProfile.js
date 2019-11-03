/**
 * This is the profile view from the USERS perpsective  (as opposed to the admin's)
 * The admin can edit fields. The user cannot.
 */


import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../comps/Header'
import Fetch from '../scripts/fetch.js';
import '../style/Profile.css'

class Profile extends React.Component{
    
    state = {
        user: undefined,
        firstname: "",
        lastname: "",
        avatar: "",
        description: "",
        email: "", 
        pref: "",
        paypal: "",
        editing: false
    }

    componentDidMount(){
        const user = this.getUser()
        if (user){
            this.setState({
                firstname: user.firstName,
                lastname: user.lastName,
                avatar: user.picUrl,
                description: user.description,  
                email: user.email, 
                pref: user.preference,
                paypal: user.paypal,
                user: user
            });
            const pic = document.querySelector("#profile-pic-" + user.id);
            pic.style.backgroundImage = "url('" + user.picUrl + "')";
        }
    }

    /**
     * Get the id number of this user.
     */
    getUserNum(){
        const {user_number} = this.props.match.params
        return user_number
    }

    /**
     * Get the object representing this user
     */
    getUser(){
        const userNumber = this.getUserNum();
        const userList = Fetch.fetchUsers();
        return userList.filter(user => user.id === parseInt(userNumber))[0];
    }

    render() {
        const user = this.getUser();
        if (user === undefined){
            return <Redirect to='/404'/>
        }
        
        return (
            <div>
                <Header user="user"/>
                
                <div className="profile-container">
                    <div className="profile-pic-and-name">
                        <div className="profile-pic" id={"profile-pic-" + user.id}>
                        </div>
                        <div className="profile-name-container">
                            <h1>{user.username} <a href={this.state.paypal} target="_blank" rel="noopener noreferrer"><i className="fa fa-cc-paypal"></i></a></h1> 
                            {this.state.firstname} {this.state.lastname}
                        </div>
                        <div className="profile-desc">
                            <b>Description</b> 
                            <p>{this.state.description}</p>
                            <br/>
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