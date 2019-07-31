import axios from 'axios';

import firebaseKeys from '../apiKeys.json';

const baseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getMySteps = regimenId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/steps.json?orderBy="regimenId"&equalTo="${regimenId}"`)
    .then((res) => {
      const steps = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          steps.push(res.data[fbKey]);
        });
      }
      resolve(steps);
    })
    .catch(err => reject(err));
});

const postStep = NewStep => axios.post(`${baseUrl}/steps.json`, NewStep);

export default {
  getMySteps,
  postStep
};
