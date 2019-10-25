import React from 'react'
import { Redirect } from 'react-router-dom'
import dummy_user_list from './dummy_user_list.json'

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

    render() {

        const user = this.getUser()

        if (user === undefined){
            return <Redirect to='/404'/>
        }
        console.log(user)
        return (
            <div>
                { user.username }
            </div>
        )
    }
}

export default Profile 