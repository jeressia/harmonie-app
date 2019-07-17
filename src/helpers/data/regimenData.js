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
    })
    .catch(err => reject(err));
});

const getAllRegimens = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/regimens.json`)
    .then((res) => {
      const regimens = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        if (res.data[fbKey].isPrivate === false) {
          regimens.push(res.data[fbKey]);
        }
      });
      resolve(regimens);
    })
    .catch(err => reject(err));
});

const putRegimen = (updatedRegimen, regimenId) => axios.put(`${baseUrl}/regimens/${regimenId}.json`, updatedRegimen);

const getSingleRegimen = regimenId => axios.get(`${baseUrl}/regimens/${regimenId}.json`);

export default {
  getMyRegimens,
  getAllRegimens,
  getSingleRegimen,
  putRegimen,
};
