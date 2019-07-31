import axios from 'axios';
import firebaseKeys from '../apiKeys.json';

const baseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getMyUserInfo = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const users = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          users.push(res.data[fbKey]);
        });
      }
      resolve(users);
    })
    .catch(err => reject(err));
});

export default { getMyUserInfo };
