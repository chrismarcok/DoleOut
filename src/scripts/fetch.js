import dummy_user_list from '../data/dummy_user_list.json';
import dummy_group_list from '../data/dummy_group_list.json';
import dummy_group_msgs from '../data/dummy_group_msgs.json';

const Fetch = {
  fetchGroups() {
    //here is where we would get stuff from a server
    return dummy_group_list;
  },
  
  fetchUsers(){
    //here is where we would get stuff from a server
    return dummy_user_list;
  },
  
  fetchGroupMsgs() {
    //here is where we would get stuff from a server
    return dummy_group_msgs;
  },
}

export {  Fetch as default }