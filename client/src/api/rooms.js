import axios from 'axios';
import { authHeader } from './authHeader';

class UserRooms {
  getUserChats() {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/chats`, {
      headers: authHeader(),
    });
  }
}

export default new UserRooms();
