import _ from 'lodash';
import ls from 'local-storage';

const isLoggedIn = () => _.has(JSON.parse(ls.get('profile')), 'id');

export default isLoggedIn;
