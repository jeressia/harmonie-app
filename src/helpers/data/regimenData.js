import axios from 'axios';
import firebaseKeys from '../apiKeys.json';

const baseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getMyRegimens = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/regimens.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const regimens = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          regimens.push(res.data[fbKey]);
        });
      }
      resolve(regimens);
      console.error(regimens);
    })
    .catch(err => reject(err));
});

export default { getMyRegimens };
