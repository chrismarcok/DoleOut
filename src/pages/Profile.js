import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../comps/Header'
import dummy_user_list from './dummy_user_list.json'
import '../style/Profile.css'

class Profile extends React.Component{
    getUserNum(){
        const {user_number} = this.props.match.params
        return user_number
    }
    fetchUsers(){
        //Here we would fetch them from a database
        return dummy_user_list
    }
    getUser(){
        const userNumber = this.getUserNum()
        const userList = this.fetchUsers()
        return userList.filter(user => user.id === parseInt(userNumber))[0]
    }

    componentDidMount(){
        const user = this.getUser()
        if (user){
            const pic = document.querySelector("#profile-pic-" + user.id)
            pic.style.backgroundImage = "url('" + user.picUrl + "')"
        }
    }

    render() {

        const user = this.getUser()

        if (user === undefined){
            return <Redirect to='/404'/>
        }
        
        return (
            <div>
                <Header />
                <div className="profile-container">
                    <div className="profile-pic-and-name">
                        <div className="profile-pic" id={"profile-pic-" + user.id}>
                        </div>
                        <div className="profile-name-container">
                            <h1>{user.username}</h1>
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                    <div className="profile-info-contianer">
                        <h3>Email</h3>
                        <h4>{user.email}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile 