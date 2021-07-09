import axios from 'axios';

const authURL = `${process.env.REACT_APP_SERVER_URL}/api/auth`;

class AuthService {
  login(username, password) {
    return axios
      .post(`${authURL}/signin`, {
        username,
        password,
      }).then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      }).catch((err) => {
        console.error('Auth service login: ', err);
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password, bio) {
    return axios.post(`${authURL}/signup`, {
      username,
      password,
      bio,
    }).then((response) => response.data)
      .then(() => this.login(username, password))
      .catch((err) => {
        console.error(`Register error:`, err);
      });
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
