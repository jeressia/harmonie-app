import axios from 'axios';
import firebaseKeys from '../apiKeys.json';

const baseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/types.json`)
    .then((res) => {
      const types = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        types.push(res.data[fbKey]);
      });
      resolve(types);
    })
    .catch(err => reject(err));
});

export default {
  getTypes,
};
