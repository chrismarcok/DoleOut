/**
 * This is the Profile Page.
 * This is the view from the admin's perspective (as opposed to the user's)
 * The admin can rename fields. The user cannot (although the user should be 
 * able to change their own fields when logging in is implemented).
 */

import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../comps/Header'
import Fetch from '../scripts/fetch.js';
import '../style/Profile.css'
import Helper from '../scripts/helper.js';

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
     * Toggles whether the user can edit his or her information with displayed 
     * input fields. This is where we would need to update the server database that 
     * has the user's information too. (in the else section)
     */
    toggleEdit = () => {
        if (!this.state.editing){
            this.setState({
                editing: true
            });
            document.querySelector(".profile-edit-container").style.display = "block";
            document.querySelector(".profile-save-btn").style.display = "block";
            document.querySelector(".profile-edit-btn").style.display = "none";
        }
        else {
            this.setState({
                editing: false
            });
            document.querySelector(".profile-edit-container").style.display = "none";
            document.querySelector(".profile-save-btn").style.display = "none";
            document.querySelector(".profile-edit-btn").style.display = "block";

            const pic = document.querySelector("#profile-pic-" + this.state.user.id);
            pic.style.backgroundImage = "url('" + this.state.avatar + "')";
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
                <Header user="admin"/>
                <div className="profile-btn profile-edit-btn" onClick={this.toggleEdit}>
                    Edit <i className="fa fa-pencil"></i>
                </div>
                <div className="profile-btn profile-save-btn" onClick={this.toggleEdit}>
                    Save <i className="fa fa-check"></i>
                </div>
                
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
                    <div className="profile-edit-container">
                        <p>First Name</p>
                        <input type="text" name="firstname" onChange={Helper.handleInputChange.bind(this)} defaultValue={this.state.firstname}></input>
                        <p>Last Name</p>
                        <input type="text" name="lastname" onChange={Helper.handleInputChange.bind(this)} defaultValue={this.state.lastname}></input>
                        <p>Avatar URL</p>
                        <input type="text" name="avatar" onChange={Helper.handleInputChange.bind(this)} defaultValue={this.state.avatar}></input>
                        <p>Description</p>
                        <input type="text" name="description" onChange={Helper.handleInputChange.bind(this)} defaultValue={this.state.description}></input>
                        <p>Preferred Payment Method</p>
                        <input type="text" name="pref" onChange={Helper.handleInputChange.bind(this)} defaultValue={this.state.pref}></input>
                        <p>Email</p>
                        <input type="text" name="email" onChange={Helper.handleInputChange.bind(this)} defaultValue={this.state.email}></input>
                        <p>PayPal URL</p>
                        <input type="text" name="paypal" onChange={Helper.handleInputChange.bind(this)} defaultValue={this.state.paypal}></input>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile 