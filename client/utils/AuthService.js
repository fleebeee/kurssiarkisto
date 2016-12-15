import fetch from 'isomorphic-fetch';
import ls from 'local-storage';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || 'http://localhost:3003';
    this.login = this.login.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.setToken = this.setToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.logout = this.logout.bind(this);
    this._checkStatus = this._checkStatus.bind(this);
    this.authFetch = this.authFetch.bind(this);
  }

  async login(email, password) {
    // Get a token
    const res = await this.authFetch(`${this.domain}/auth/authenticate`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.success) {
      this.setToken(res.token);
      this.setProfile(res.profile);
    }

    return res;
  }

  loggedIn() {
    // TODO Check if token is valid (maybe)
    const token = this.getToken();
    return !!token;
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    ls.set('profile', JSON.stringify(profile));
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = ls.get('profile');
    return profile ? JSON.parse(profile) : {};
  }

  setToken(jwt) {
    // Saves user token to localStorage
    ls.set('jwt', jwt);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return ls.get('jwt');
  }

  logout() {
    // Clear user token and profile data from localStorage
    ls.remove('jwt');
    ls.remove('profile');
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    /*
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
    */
    return response;
  }

  authFetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.loggedIn()) {
      headers.Authorization = this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
    .then(this._checkStatus)
    .then(response => response.json());
  }
}
