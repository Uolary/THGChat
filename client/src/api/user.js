import axios from 'axios';
import { authHeader } from './authHeader';

const userURL = `${process.env.REACT_APP_SERVER_URL}/api/user`;

class UserService {
  getInfo(id) {
    const headers = authHeader();

    headers.id = id;

    return axios.get(`${userURL}/info`, {headers}).then((response) => response.data).catch((err) => {
      console.error(`getInfo error:`, err);
    });
  }
}

export default new UserService();
